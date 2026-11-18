CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    image TEXT NOT NULL,
    stock_count INTEGER NOT NULL DEFAULT 0,
    shipping_cost REAL NOT NULL DEFAULT 0.0,
    details TEXT NOT NULL,
    category TEXT NOT NULL,
    promotion_tag TEXT
);

CREATE TABLE IF NOT EXISTS product_specifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    spec_key TEXT NOT NULL,
    spec_value TEXT NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    total_amount REAL NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    title TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Seed 80 Products
INSERT OR IGNORE INTO products (id, title, description, price, rating, image, stock_count, shipping_cost, details, category, promotion_tag) VALUES 
('p1', 'Wireless ANC Headphones', 'Active noise cancellation with high-fidelity acoustics.', 149.99, 5, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60', 4, 5.0, 'Premium over-ear wireless headphones with custom dynamic drivers.', 'Audio', 'SAVE 20%'),
('p2', 'Mechanical RGB Keyboard', 'Hot-swappable tactile switches with customizable backlight.', 89.99, 4, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60', 12, 0.0, 'Compact layout designed for gamers and developers.', 'Computing', NULL),
('p3', 'Ultra Wide Curved Monitor 34"', '144Hz refresh rate with immersive 1500R curvature.', 429.99, 5, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60', 2, 15.0, 'WQHD display designed for productive multitasking and gaming.', 'Computing', 'BEST SELLER'),
('p4', 'Smart Watch Series X', 'Heart rate monitor, GPS, and health tracking display.', 199.99, 4, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60', 8, 0.0, 'Water-resistant smartwatch with always-on AMOLED display.', 'Wearables', NULL),
('p5', 'Ergonomic Wireless Mouse', 'Precision optical sensor with dual bluetooth and 2.4G.', 49.99, 5, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60', 15, 0.0, 'Ergonomic vertical design to reduce wrist strain.', 'Computing', 'POPULAR'),
('p6', 'True Wireless Earbuds Pro', 'Low latency mode with wireless charging case.', 79.99, 4, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60', 20, 2.5, 'IPX5 water resistance and 24-hour total battery playback.', 'Audio', NULL),
('p7', 'Portable Bluetooth Speaker 20W', 'Deep bass reflex with 12 hours continuous playtime.', 59.99, 5, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60', 9, 0.0, 'Rugged outdoor design with dust proof fabric casing.', 'Audio', 'HOT DEAL'),
('p8', '4K Ultra HD Action Camera', '170-degree wide angle with EIS stabilization.', 129.99, 4, 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60', 6, 4.0, 'Includes waterproof case up to 30 meters depth.', 'Cameras', NULL),
('p9', 'USB-C Multi-port Hub 7-in-1', 'HDMI 4K, 100W Power Delivery, SD Card Reader.', 39.99, 5, 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=500&auto=format&fit=crop&q=60', 30, 0.0, 'Aluminum alloy enclosure for efficient heat dissipation.', 'Accessories', 'SAVE 15%'),
('p10', 'Smart Home Security Camera 1080p', 'Night vision with 2-way audio and motion alerts.', 34.99, 4, 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=60', 11, 3.0, 'Cloud storage support and smartphone app integration.', 'Smart Home', NULL),

('p11', 'Noise Cancelling Gaming Headset', '7.1 Surround Sound with detachable microphone.', 99.99, 5, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60', 14, 0.0, 'Memory foam ear cushions for long gaming sessions.', 'Audio', NULL),
('p12', 'Flagship Smartphone 256GB', '6.7 inch 120Hz OLED, 108MP Quad Camera.', 899.99, 5, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60', 5, 0.0, 'Next generation 5G processor with fast wired and wireless charging.', 'Smartphones', 'NEW'),
('p13', 'Tablet Pro 11-inch', 'Retina Touch Display with Stylus Support.', 599.99, 4, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60', 7, 10.0, 'All-day battery life with quad speaker array.', 'Computing', NULL),
('p14', 'Smart Fitness Tracker Band', 'SpO2 monitoring, sleep tracking, 14-day battery.', 39.99, 4, 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=60', 25, 0.0, 'Lightweight silicone strap with water resistance up to 50m.', 'Wearables', 'LIMITED'),
('p15', 'Full-Frame Mirrorless Camera', '24.2MP sensor with 4K 60fps video recording.', 1499.99, 5, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60', 3, 20.0, 'Professional grade body with dual SD card slots.', 'Cameras', NULL),

('p16', 'Smart LED Light Strip 5M', 'RGBIC color changing compatible with Alexa/Google.', 24.99, 4, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60', 40, 0.0, 'Syncs with music and offers customizable lighting scenes.', 'Smart Home', 'BEST SELLER'),
('p17', 'Wireless Charging Pad 15W', 'Fast wireless charge for iPhone and Android.', 19.99, 4, 'https://images.unsplash.com/photo-1622445268465-8438165a248f?w=500&auto=format&fit=crop&q=60', 50, 0.0, 'Non-slip rubber surface with LED status indicator light.', 'Accessories', NULL),
('p18', 'High Speed NVMe M.2 SSD 1TB', 'PCIe Gen4 up to 7000MB/s read speed.', 119.99, 5, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=60', 18, 0.0, 'Includes aluminum heatsink for low thermal throttling.', 'Computing', NULL),
('p19', 'Wireless Controller for PC & Console', 'Haptic feedback with remappable back triggers.', 64.99, 5, 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&auto=format&fit=crop&q=60', 10, 0.0, 'Bluetooth 5.0 and wired USB-C dual connectivity.', 'Gaming', NULL),
('p20', 'Smart Wi-Fi Plug 4-Pack', 'Energy monitoring with app scheduling controls.', 29.99, 4, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60', 30, 0.0, 'No hub required; connects directly to 2.4GHz Wi-Fi networks.', 'Smart Home', 'SAVE 10%'),

('p21', 'Studio Condenser USB Microphone', 'Cardioid pickup pattern with pop filter and tripod.', 69.99, 5, 'https://images.unsplash.com/photo-1590658006821-04f4008d5717?w=500&auto=format&fit=crop&q=60', 12, 0.0, 'Plug-and-play for podcasting, streaming, and vocals.', 'Audio', NULL),
('p22', '4K Gaming Monitor 27"', '1ms Response time, IPS display, FreeSync Premium.', 349.99, 5, 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&auto=format&fit=crop&q=60', 6, 12.0, 'Frameless bezel design with adjustable height stand.', 'Computing', 'POPULAR'),
('p23', 'Compact Power Bank 20000mAh', 'Dual USB-A and 22.5W Fast Charging Type-C output.', 34.99, 4, 'https://images.unsplash.com/photo-1609592424074-7223b5c77740?w=500&auto=format&fit=crop&q=60', 35, 0.0, 'LED display shows exact remaining battery percentage.', 'Accessories', NULL),
('p24', 'Drone Quadcopter with 4K Cam', '3-axis gimbal with 30 mins flight time per battery.', 499.99, 5, 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=500&auto=format&fit=crop&q=60', 4, 15.0, 'GPS auto-return and obstacle avoidance system.', 'Cameras', 'FEATURED'),
('p25', 'Smart Door Lock with Keypad', 'Fingerprint unlock, passcodes, and physical keys.', 139.99, 4, 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=60', 8, 5.0, 'Auto-locks behind you with anti-peep passcode protection.', 'Smart Home', NULL),

('p26', 'Foldable Laptop Stand', 'Aluminum ergonomic riser with 6 angle adjustments.', 22.99, 5, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60', 50, 0.0, 'Promotes optimal heat ventilation for laptops up to 17 inches.', 'Accessories', NULL),
('p27', 'Spatial Audio Soundbar 120W', 'Subwoofer built-in with optical, AUX, and Bluetooth.', 129.99, 4, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=60', 7, 8.0, 'Enhances TV dialogue with multiple equalizer modes.', 'Audio', NULL),
('p28', 'VR Headset All-in-One 128GB', 'Standalone 3D virtual reality with motion controllers.', 399.99, 5, 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=500&auto=format&fit=crop&q=60', 5, 0.0, 'High resolution display with immersive spatial audio built in.', 'Gaming', 'HOT'),
('p29', 'Mini Video Projector 1080p Supported', 'Portable cinema projector with HDMI and USB inputs.', 89.99, 4, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60', 9, 4.0, 'Projects screens up to 170 inches for movie nights.', 'Smart Home', NULL),
('p30', 'Mechanical Numpad Keyboard', 'Gateron switches with custom keycaps and RGB lighting.', 35.99, 4, 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60', 16, 0.0, 'Detachable USB-C cable designed for data entry and shortcut macros.', 'Computing', NULL),

('p31', 'Mesh Wi-Fi 6 System (3-Pack)', 'Whole home coverage up to 5000 sq ft.', 229.99, 5, 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&auto=format&fit=crop&q=60', 6, 0.0, 'Seamless roaming supports up to 100 connected devices.', 'Computing', 'BEST SELLER'),
('p32', 'Car Dash Cam Dual 4K + 1080p', 'Front and rear recording with G-sensor loop recording.', 119.99, 4, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60', 11, 0.0, 'Wide dynamic range for clear night recording.', 'Cameras', NULL),
('p33', 'Bluetooth Key Tracker 4-Pack', 'Item locator for keys, wallets, and backpacks.', 49.99, 4, 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=500&auto=format&fit=crop&q=60', 22, 0.0, 'Water resistant design with replaceable coin battery.', 'Accessories', NULL),
('p34', 'Pro Handheld Gimbal Stabilizer', '3-axis stabilization for smartphones with tracking mode.', 109.99, 5, 'https://images.unsplash.com/photo-1589872584145-2f470a133f37?w=500&auto=format&fit=crop&q=60', 8, 3.5, 'Smooth cinematic motion for vloggers and content creators.', 'Cameras', NULL),
('p35', 'Electric Standing Desk Converter', 'Motorized height adjust for dual monitors.', 189.99, 5, 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=500&auto=format&fit=crop&q=60', 3, 25.0, 'Smooth quiet transition from sit to stand positions.', 'Computing', NULL),

('p36', 'Smart Thermostat Programmable', 'Save energy with room sensor and smartphone schedule.', 159.99, 4, 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=500&auto=format&fit=crop&q=60', 10, 0.0, 'Easy DIY installation compatible with standard HVAC systems.', 'Smart Home', NULL),
('p37', 'Noise Isolating In-Ear Earphones', 'Wired 3.5mm jack with inline mic and volume control.', 14.99, 4, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=60', 60, 0.0, 'Durable tangle-free cable with extra silicone ear tips.', 'Audio', NULL),
('p38', 'MagSafe Car Phone Mount 15W', 'Air vent magnetic wireless charger.', 27.99, 5, 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500&auto=format&fit=crop&q=60', 30, 0.0, 'Strong magnetic lock holds phone securely over bumpy roads.', 'Accessories', NULL),
('p39', 'Wireless Mouse with Quiet Clicks', 'Silent switches for office and library environments.', 21.99, 4, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60', 25, 0.0, 'Auto-sleep feature prolongs battery life up to 18 months.', 'Computing', NULL),
('p40', 'Smart Air Purifier HEPA H13', 'Removes 99.97% allergens, dust, and smoke.', 129.99, 5, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&auto=format&fit=crop&q=60', 7, 9.0, 'Quiet night mode with air quality sensor indicator.', 'Smart Home', 'POPULAR'),

('p41', 'Retro Gaming Handheld Console', 'Preloaded with 500 classic arcade games.', 39.99, 4, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60', 15, 0.0, '3-inch IPS screen with TV out connection support.', 'Gaming', NULL),
('p42', 'USB Condenser Microphone Arm Kit', 'Includes boom arm, shock mount, and cable ties.', 49.99, 5, 'https://images.unsplash.com/photo-1590658006821-04f4008d5717?w=500&auto=format&fit=crop&q=60', 12, 0.0, 'Sturdy metal construction for desk clamping.', 'Audio', NULL),
('p43', 'High Precision Digital Drawing Pad', '8192 levels pressure sensitivity for graphics design.', 69.99, 4, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60', 9, 0.0, 'Battery-free stylus with customizable shortcut keys.', 'Computing', NULL),
('p44', 'Smart Scale with Body Composition', 'BMI, Muscle Mass, Fat Percentage sync via Bluetooth.', 32.99, 4, 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=60', 20, 0.0, 'Tempered glass top supports multi-user tracking profiles.', 'Wearables', NULL),
('p45', 'Outdoor Waterproof Solar Power Bank', '26800mAh with dual flashlight and solar panel.', 45.99, 4, 'https://images.unsplash.com/photo-1609592424074-7223b5c77740?w=500&auto=format&fit=crop&q=60', 14, 0.0, 'Shockproof casing designed for camping and hiking trips.', 'Accessories', NULL),

('p46', 'Ultra Thin Wireless Keyboard', 'Rechargeable multi-device Bluetooth keyboard.', 34.99, 4, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60', 18, 0.0, 'Seamlessly switch between phone, tablet, and PC.', 'Computing', NULL),
('p47', 'Fast Charger GaN 65W 3-Port', 'Compact wall charger for laptops and phones.', 29.99, 5, 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=500&auto=format&fit=crop&q=60', 40, 0.0, 'Gallium Nitride technology offers smaller size and higher efficiency.', 'Accessories', 'BEST SELLER'),
('p48', 'Streaming HD Capture Card 4K', 'Zero latency HDMI passthrough for game recording.', 79.99, 5, 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&auto=format&fit=crop&q=60', 8, 0.0, 'Plug and play setup compatible with OBS Studio.', 'Gaming', NULL),
('p49', 'Smart Robotic Vacuum Cleaner', 'Wi-Fi connectivity, self-charging, and obstacle sensors.', 199.99, 4, 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=60', 5, 10.0, 'Low profile design cleans under furniture and hard floors.', 'Smart Home', 'SAVE $50'),
('p50', 'Waterproof Portable Shower Speaker', 'IPX7 rating with strong suction cup base.', 25.99, 4, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60', 25, 0.0, 'Enjoy music in the shower, beach, or swimming pool.', 'Audio', NULL),

('p51', 'RGB Gaming Desk Mouse Pad (XXL)', '900x400mm surface with 14 lighting modes.', 19.99, 5, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60', 35, 0.0, 'Micro-textured cloth surface optimized for all gaming sensors.', 'Gaming', NULL),
('p52', 'Thunderbolt 4 Cable 40Gbps (2M)', 'Supports 8K video output and 100W power delivery.', 28.99, 5, 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=500&auto=format&fit=crop&q=60', 30, 0.0, 'Nylon braided sleeve for enhanced durability and flex life.', 'Accessories', NULL),
('p53', 'Compact Bone Conduction Headphones', 'Open-ear audio safety designed for runners.', 89.99, 4, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60', 10, 0.0, 'Transmits sound through cheekbones so you hear ambient sounds.', 'Audio', NULL),
('p54', '4K Streaming Stick with Voice Remote', 'Dolby Vision HDR streaming player.', 49.99, 5, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60', 28, 0.0, 'Fast app launch with dedicated shortcut buttons.', 'Smart Home', 'POPULAR'),
('p55', 'Universal Remote Control for Smart TV', 'Backlit buttons with infrared and Bluetooth learning.', 18.99, 4, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60', 45, 0.0, 'Controls up to 4 different entertainment devices.', 'Smart Home', NULL),

('p56', 'Mechanical Gaming Keyboard TKL', 'Tenkeyless red linear switches with RGB lighting.', 74.99, 5, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60', 14, 0.0, 'Saves desk space for fast mouse movements.', 'Gaming', NULL),
('p57', 'Smart Video Doorbell Wireless', 'Chime included, HD video, motion detection.', 89.99, 4, 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=60', 9, 0.0, 'Receive real-time phone alerts when visitors ring door.', 'Smart Home', NULL),
('p58', 'Thermal Paste High Performance (4g)', 'Optimal heat dissipation for CPU and GPU coolers.', 9.99, 5, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=60', 100, 0.0, 'Non-conductive carbon formula for safe CPU installation.', 'Computing', NULL),
('p59', 'Heavy Duty Monitor Arm Mount', 'Gas spring full motion desk clamp for screens up to 32".', 44.99, 5, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60', 16, 4.0, 'Integrated cable management channels clean up desk clutter.', 'Computing', NULL),
('p60', 'Kids Fire Tablet 8-inch', 'Parental controls case with 10-hour battery life.', 99.99, 4, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60', 12, 0.0, 'Durable kid-proof case with built-in kickstand.', 'Computing', NULL),

('p61', 'Bluetooth Audio Transmitter/Receiver', 'Low latency 3.5mm jack adapter for flight & TV.', 22.99, 4, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60', 30, 0.0, 'Turn non-Bluetooth devices into wireless audio transmitters.', 'Audio', NULL),
('p62', 'USB-C External Hard Drive 2TB', 'Shockproof rugged portable backup drive.', 79.99, 4, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=60', 15, 0.0, 'Drag and drop file backup for Mac and Windows.', 'Computing', NULL),
('p63', 'High Frame Rate Web Camera 1080p 60fps', 'Autofocus webcam with privacy shutter.', 59.99, 5, 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60', 11, 0.0, 'Built-in dual stereo noise-reducing microphones.', 'Cameras', NULL),
('p64', 'Smart Alarm Clock with Wireless Charger', 'Dimmable display with sunrise simulation light.', 38.99, 4, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60', 20, 0.0, 'Dual alarm settings with backup battery slot.', 'Smart Home', NULL),
('p65', 'Vertical Laptop Stand Dock Holder', 'Adjustable width gravity desktop holder.', 18.99, 5, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60', 40, 0.0, 'Cradle design holds laptops upright to save space.', 'Accessories', NULL),

('p66', 'Portable Bluetooth Label Maker', 'Wireless barcode and sticker printer for organization.', 31.99, 4, 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=500&auto=format&fit=crop&q=60', 18, 0.0, 'Thermal inkless printing using smartphone template app.', 'Accessories', NULL),
('p67', 'In-Ear Sleep Headphones Headband', 'Soft wireless music headband for sleeping & sports.', 19.99, 4, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60', 35, 0.0, 'Ultra thin flat speakers wrapped in breathable fabric.', 'Audio', NULL),
('p68', 'Wireless Charging Mouse Pad', 'Build-in 10W wireless charging zone.', 29.99, 4, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60', 22, 0.0, 'Charge your phone while working or gaming.', 'Computing', NULL),
('p69', 'Smart Water Bottle Hydration Reminder', 'LED glow indicator tracks daily water intake.', 44.99, 4, 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=60', 14, 0.0, 'Stainless steel vacuum insulated keeps drinks cold 24hrs.', 'Wearables', NULL),
('p70', 'HDMI Switch 4K 3-in-1 Out', 'Manual selector switch box for consoles and TV.', 16.99, 4, 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=500&auto=format&fit=crop&q=60', 50, 0.0, 'Connect multiple gaming consoles to one single HDMI port.', 'Gaming', NULL),

('p71', 'Active Noise Cancelling Earbuds', 'Transparancy mode with punchy audio drivers.', 84.99, 5, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60', 12, 0.0, 'Touch controls with voice assistant support.', 'Audio', NULL),
('p72', 'Magnetic Phone Ring Grip Holder', 'MagSafe compatible kickstand ring.', 12.99, 5, 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500&auto=format&fit=crop&q=60', 70, 0.0, 'Folds flat with 360-degree rotation grip ring.', 'Accessories', NULL),
('p73', 'Wireless Presentation Clicker Pointer', 'RF 2.4GHz red laser pointer for slideshows.', 15.99, 4, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60', 30, 0.0, 'Plug-and-play USB receiver stows inside battery compartment.', 'Accessories', NULL),
('p74', 'Smart Plant Soil Moisture Sensor', 'Monitors sunlight, temperature, and moisture levels.', 23.99, 4, 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=500&auto=format&fit=crop&q=60', 25, 0.0, 'Bluetoothed database identifies thousands of houseplant species.', 'Smart Home', NULL),
('p75', 'Anti Blue Light Computer Glasses', 'Lightweight TR90 frames to reduce eye strain.', 17.99, 5, 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=500&auto=format&fit=crop&q=60', 45, 0.0, 'Blocks glare from screens during long work hours.', 'Accessories', NULL),

('p76', 'Hi-Fi Desktop Bookshelf Speakers 40W', 'Wooden enclosure with optical and RCA inputs.', 119.99, 5, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=60', 8, 5.0, 'Studio quality sound for desktop setups and turntables.', 'Audio', NULL),
('p77', 'Portable Mini Fan USB-C Rechargeable', '3-speed handheld fan with lanyard strap.', 11.99, 4, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&auto=format&fit=crop&q=60', 80, 0.0, 'Quiet motor providing up to 8 hours runtime per charge.', 'Accessories', NULL),
('p78', 'Smart Diffuser & Essential Oil Humidifier', 'RGB ambient light with timer auto shut-off.', 27.99, 4, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&auto=format&fit=crop&q=60', 20, 0.0, 'Works with smartphone app and voice commands.', 'Smart Home', NULL),
('p79', 'Ultra Slim 4K Portable Monitor 15.6"', 'USB-C secondary screen for laptops and gaming.', 179.99, 5, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60', 6, 0.0, 'Dual Type-C ports allow power and video over single cable.', 'Computing', 'POPULAR'),
('p80', 'VR Cable Management Pulley System', 'Retractable ceiling mounts for VR headset wires.', 21.99, 5, 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=500&auto=format&fit=crop&q=60', 18, 0.0, 'Noise damping silicone design keeps VR tether off the floor.', 'Gaming', NULL);

-- Seed Specifications sample
INSERT OR IGNORE INTO product_specifications (product_id, spec_key, spec_value) VALUES 
('p1', 'Battery Life', '30 Hours'),
('p1', 'Bluetooth', '5.3'),
('p2', 'Switch Type', 'Hot-swappable Brown'),
('p3', 'Refresh Rate', '144Hz'),
('p3', 'Resolution', '3440 x 1440'),
('p4', 'Display', '1.8" AMOLED'),
('p5', 'DPI', '4000 DPI'),
('p12', 'Processor', 'Octa-Core 3.2GHz'),
('p12', 'RAM', '12GB'),
('p15', 'Sensor', '24.2MP Full-Frame'),
('p18', 'Read Speed', '7000 MB/s');

-- Seed User
INSERT OR IGNORE INTO users (id, email, password_hash, name)
VALUES ('u1', 'demo@electronicstore.com', '$2y$10$eImiTXuWVxfM37uY4JANjOL.sB4V3o0zN.G9jB3yK31fP0H1L5mG6', 'Demo User');

