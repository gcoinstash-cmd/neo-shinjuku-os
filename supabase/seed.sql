-- NEO SHINJUKU OS: PRODUCTION SEED DATA
-- Turnkey mock production records for instant validation

-- 1. Seed: capsule_booths
INSERT INTO public.capsule_booths (node_id, name, capacity_desc, audio_channel, status)
VALUES
    ('CAP-01', 'Capsule Alpha-01', '2-3 Guests', 'Cyberpunk Ambient Stream 4', 'OCCUPIED'),
    ('GRID-04', 'Neon Grid-04 (Hologram View)', '4-6 Guests', 'Synthwave Lo-Fi Sub-bass', 'OCCUPIED'),
    ('VAULT-09', 'Executive Syndicate Vault', '8-12 Guests', 'Soundproofed Dark Room', 'RESERVED'),
    ('BAR-03', 'Robata Bar Node 03', '2 Guests', 'Charcoal Hearth Binaural', 'AVAILABLE')
ON CONFLICT (node_id) DO NOTHING;

-- 2. Seed: robata_menu_items
INSERT INTO public.robata_menu_items (sku, name, category, description, price_yen, hearth_temperature, in_stock)
VALUES
    ('ROB-01', 'A5 Wagyu Kushiyaki [Plasma Seared]', 'Robata Skewers', 'Miyazaki A5 Wagyu cubes, bio-luminescent smoked tare, charcoal ash salt', 3800, '850°C', true),
    ('ROB-02', 'Carbon-Glazed Unagi Nigiri', 'Specialty Nigiri', 'Flash-chilled freshwater eel, liquid data reduction, crisp nori matrix', 6200, 'Flash-Chilled', true),
    ('ROB-03', 'Glitch-Infused Black Truffle Gyoza', 'Synthetics', 'Hand-crimped wrappers, electric kelp wasabi emulsion, charred scallion oil', 2400, 'Optimum', true),
    ('ROB-04', 'Toxin-Free Bio-Gen Tonkotsu Ramen', 'Broth Protocols', '36-hour extracted collagen broth, glowing slow-poached egg, char siu pork', 4800, '94°C', true)
ON CONFLICT (sku) DO NOTHING;

-- 3. Seed: cocktail_dispensary
INSERT INTO public.cocktail_dispensary (formula_code, name, abv, price_yen, reservoir_level, dispensary_status)
VALUES
    ('CKT-101', 'Void Cocktail (Charcoal Vodka + Nebula Dust)', '18%', 2400, '92% Full', 'ACTIVE'),
    ('CKT-102', 'Iridescent Electric Cyan Gin', '22%', 1200, '78% Full', 'ACTIVE'),
    ('CKT-103', 'Synthesized Glucose Nectar', '0% Non-Alc', 1800, '96% Full', 'ACTIVE'),
    ('CKT-104', 'Junmai Daiginjo 2077 Reserve Carafe', '16%', 8500, '14 Bottles', 'ACTIVE')
ON CONFLICT (formula_code) DO NOTHING;

-- 4. Seed: izakaya_reservations
INSERT INTO public.izakaya_reservations (guest_name, guest_email, guest_phone, protocol_tier, party_size, reservation_date, reservation_time, booth_node, dietary_matrix, status)
VALUES
    ('Dr. Arisaka Takahashi', 'takahashi@arisaka-grid.jp', '+81 90-1234-5678', 'Cyber Omakase', 2, CURRENT_DATE, '20:30 JST', 'Capsule Alpha-01', 'No shellfish allergies; prefers extra wasabi mist', 'CONFIRMED'),
    ('Sloane Sterling', 'sloane@sterling-ventures.com', '+1 415-890-1234', 'Robata VIP Rations', 4, CURRENT_DATE, '21:15 JST', 'Neon Grid-04', 'Zero dietary restrictions; pairing with Junmai Daiginjo', 'SEATED'),
    ('Kenji Vance', 'vance@data-node.io', '+81 80-9876-5432', 'Liquid Data Tasting', 2, CURRENT_DATE, '22:00 JST', 'Robata Bar Node 03', 'Vegetarian broth substitute requested', 'CONFIRMED'),
    ('Elena Rostova', 'elena@nordic-syndicate.fi', '+358 40-1234567', 'Corporate Syndicate', 6, CURRENT_DATE + INTERVAL '1 day', '22:45 JST', 'Executive Syndicate Vault', 'Exclusive private buyout session', 'PENDING_DEPOSIT');
