create extension if not exists "pgcrypto";

create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text not null default '#38aee4',
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.group_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'member')),
  created_at timestamptz not null default now(),
  unique (group_id, user_id)
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  color text not null default '#38aee4',
  icon_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.planner_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  group_id uuid references public.groups(id) on delete cascade,
  type text not null check (type in ('event', 'task', 'note')),
  title text not null,
  memo text,
  category_id uuid references public.categories(id) on delete set null,
  start_at timestamptz,
  end_at timestamptz,
  all_day boolean not null default false,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists planner_items_user_start_idx on public.planner_items(user_id, start_at);
create index if not exists planner_items_group_start_idx on public.planner_items(group_id, start_at);
create index if not exists group_members_user_idx on public.group_members(user_id);

alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.categories enable row level security;
alter table public.planner_items enable row level security;

create policy "groups visible to members"
on public.groups for select
using (
  created_by = auth.uid()
  or exists (
    select 1 from public.group_members gm
    where gm.group_id = groups.id and gm.user_id = auth.uid()
  )
);

create policy "groups can be created"
on public.groups for insert
with check (created_by = auth.uid());

create policy "group owners can update"
on public.groups for update
using (created_by = auth.uid())
with check (created_by = auth.uid());

create policy "members visible to group members"
on public.group_members for select
using (
  user_id = auth.uid()
  or exists (
    select 1 from public.group_members gm
    where gm.group_id = group_members.group_id and gm.user_id = auth.uid()
  )
);

create policy "owners can add members"
on public.group_members for insert
with check (
  exists (
    select 1 from public.groups g
    where g.id = group_id and g.created_by = auth.uid()
  )
);

create policy "categories visible to owner"
on public.categories for select
using (user_id = auth.uid() or user_id is null);

create policy "categories editable by owner"
on public.categories for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "items visible to owner or group member"
on public.planner_items for select
using (
  user_id = auth.uid()
  or exists (
    select 1 from public.group_members gm
    where gm.group_id = planner_items.group_id and gm.user_id = auth.uid()
  )
);

create policy "items can be created by owner or group member"
on public.planner_items for insert
with check (
  user_id = auth.uid()
  and (
    group_id is null
    or exists (
      select 1 from public.group_members gm
      where gm.group_id = planner_items.group_id and gm.user_id = auth.uid()
    )
  )
);

create policy "items can be updated by owner or group member"
on public.planner_items for update
using (
  user_id = auth.uid()
  or exists (
    select 1 from public.group_members gm
    where gm.group_id = planner_items.group_id and gm.user_id = auth.uid()
  )
)
with check (
  user_id = auth.uid()
  or exists (
    select 1 from public.group_members gm
    where gm.group_id = planner_items.group_id and gm.user_id = auth.uid()
  )
);

insert into public.categories (user_id, name, color, icon_key)
values
  (null, 'personal', '#38aee4', 'spark'),
  (null, 'work', '#5577d9', 'briefcase'),
  (null, 'family', '#f59ab2', 'home'),
  (null, 'health', '#46c7a3', 'leaf'),
  (null, 'study', '#f5b84b', 'book'),
  (null, 'task', '#7c91ff', 'check'),
  (null, 'event', '#20a4d8', 'calendar'),
  (null, 'memo', '#9aa8b8', 'note')
on conflict do nothing;
