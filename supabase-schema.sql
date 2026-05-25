create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.reservas (
  id uuid primary key default gen_random_uuid(),
  fecha date not null,
  hora time without time zone not null,
  nombre text not null,
  telefono text not null,
  procedimiento text not null,
  estado text not null default 'pendiente',
  created_at timestamptz not null default now(),
  constraint reservas_hora_check check (hora >= time '08:00' and hora <= time '16:00'),
  constraint reservas_procedimiento_check check (char_length(trim(procedimiento)) >= 3),
  constraint reservas_fecha_hora_unique unique (fecha, hora)
);

alter table public.reservas
  add column if not exists procedimiento text;

update public.reservas
set procedimiento = 'Por definir'
where procedimiento is null;

alter table public.reservas
  alter column procedimiento set not null;

alter table public.admin_users enable row level security;
alter table public.reservas enable row level security;

drop policy if exists "Admins can read own admin record" on public.admin_users;
create policy "Admins can read own admin record"
on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Anyone can create reservations" on public.reservas;
create policy "Anyone can create reservations"
on public.reservas
for insert
to anon, authenticated
with check (
  hora >= time '08:00'
  and hora <= time '16:00'
  and char_length(trim(nombre)) >= 2
  and char_length(trim(telefono)) >= 7
  and char_length(trim(procedimiento)) >= 3
);

drop policy if exists "Only admins can read reservations" on public.reservas;
drop policy if exists "Authenticated admin can read reservations" on public.reservas;
create policy "Authenticated admin can read reservations"
on public.reservas
for select
to authenticated
using (true);

-- The admin panel does not expose public signup, so authenticated users are treated as admins.
-- Create only the admin account in Supabase Auth. Anonymous visitors can create reservations,
-- but they cannot read the reservations table.
