-- NEO SHINJUKU OS: PRODUCTION DATABASE SCHEMA
-- Engine: Supabase PostgreSQL (Row Level Security Enabled)
-- Standards: Ghost Factory™ 9.0+ Production Grade

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: izakaya_reservations (Guest bookings & seating allocations)
CREATE TABLE IF NOT EXISTS public.izakaya_reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT,
    protocol_tier TEXT NOT NULL CHECK (protocol_tier IN ('Cyber Omakase', 'Robata VIP Rations', 'Liquid Data Tasting', 'Corporate Syndicate')),
    party_size INTEGER NOT NULL CHECK (party_size > 0 AND party_size <= 20),
    reservation_date DATE NOT NULL,
    reservation_time TEXT NOT NULL,
    booth_node TEXT NOT NULL DEFAULT 'Capsule Alpha-01',
    dietary_matrix TEXT,
    status TEXT NOT NULL DEFAULT 'CONFIRMED' CHECK (status IN ('CONFIRMED', 'SEATED', 'COMPLETED', 'CANCELLED', 'PENDING_DEPOSIT')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table: robata_menu_items (Charcoal grill rations, skewers & synthetics)
CREATE TABLE IF NOT EXISTS public.robata_menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Robata Skewers', 'Specialty Nigiri', 'Synthetics', 'Broth Protocols')),
    description TEXT NOT NULL,
    price_yen INTEGER NOT NULL,
    hearth_temperature TEXT NOT NULL DEFAULT '850°C',
    in_stock BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table: cocktail_dispensary (Liquid data formulas & sake reserve)
CREATE TABLE IF NOT EXISTS public.cocktail_dispensary (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    formula_code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    abv TEXT NOT NULL,
    price_yen INTEGER NOT NULL,
    reservoir_level TEXT NOT NULL DEFAULT '100% Full',
    dispensary_status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (dispensary_status IN ('ACTIVE', 'MAINTENANCE', 'OFFLINE')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table: capsule_booths (Cyber seating pods & audio channel stream)
CREATE TABLE IF NOT EXISTS public.capsule_booths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    capacity_desc TEXT NOT NULL,
    audio_channel TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.izakaya_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.robata_menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cocktail_dispensary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.capsule_booths ENABLE ROW LEVEL SECURITY;

-- Anonymous public read access for storefront display
CREATE POLICY "Allow public read on robata menu" 
    ON public.robata_menu_items FOR SELECT USING (true);

CREATE POLICY "Allow public read on cocktail dispensary" 
    ON public.cocktail_dispensary FOR SELECT USING (true);

CREATE POLICY "Allow public read on capsule booths" 
    ON public.capsule_booths FOR SELECT USING (true);

CREATE POLICY "Allow public insert for reservations" 
    ON public.izakaya_reservations FOR INSERT WITH CHECK (true);

-- Authenticated operator full access (Admins)
CREATE POLICY "Allow operator full access to reservations" 
    ON public.izakaya_reservations FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow operator full access to robata menu" 
    ON public.robata_menu_items FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow operator full access to cocktail dispensary" 
    ON public.cocktail_dispensary FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow operator full access to capsule booths" 
    ON public.capsule_booths FOR ALL USING (auth.role() = 'authenticated');
