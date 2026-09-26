require('dotenv').config();
const mongoose = require('mongoose');

// Define models directly inside seed.js so no file imports are needed
const Category = mongoose.models.Category || mongoose.model('Category', new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true }
}, { timestamps: true }));

const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  inStock: { type: Boolean, default: true }
}, { timestamps: true }));

const categoriesData = [
  { name: 'Computing & Laptops', description: 'Laptops, desktops, monitors, and PC components' },
  { name: 'Audio & Headphones', description: 'Headphones, earbuds, speakers, and microphones' },
  { name: 'Gaming Gear', description: 'Consoles, controllers, VR headsets, and gaming accessories' },
  { name: 'Smart Home & IoT', description: 'Smart speakers, lighting, security cameras, and hubs' },
  { name: 'Wearables & Fitness', description: 'Smartwatches, fitness bands, and tracking devices' }
];

const rawProducts = [
  // Computing & Laptops
  { name: 'UltraSlim 14" Laptop', price: 899.99, description: 'Lightweight laptop with 16GB RAM and 512GB NVMe SSD', categoryIndex: 0, inStock: true },
  { name: 'ProWorkstation Tower', price: 1499.00, description: 'Desktop workstation equipped with 12-core CPU and 32GB RAM', categoryIndex: 0, inStock: true },
  { name: '27-inch 4K IPS Monitor', price: 349.50, description: 'Color-accurate 4K monitor with HDR10 support and USB-C hub', categoryIndex: 0, inStock: true },
  { name: '34-inch Curved Ultrawide Display', price: 549.99, description: '144Hz curved gaming and productivity ultrawide monitor', categoryIndex: 0, inStock: true },
  { name: 'Wireless Ergonomic Vertical Mouse', price: 39.99, description: 'Promotes natural wrist posture with multi-device Bluetooth', categoryIndex: 0, inStock: true },
  { name: 'Custom Mechanical Numpad', price: 29.99, description: 'Hot-swappable mechanical numeric keypad with RGB', categoryIndex: 0, inStock: true },
  { name: '10-in-1 USB-C Docking Station', price: 69.99, description: 'Dual HDMI, Ethernet, SD card, and 100W Power Delivery hub', categoryIndex: 0, inStock: true },
  { name: '2TB Portable Rugged SSD', price: 159.00, description: 'High-speed external SSD with drop and water resistance', categoryIndex: 0, inStock: true },
  { name: 'Full HD 1080p Web Camera', price: 49.99, description: 'Auto-focus streaming webcam with dual stereo microphones', categoryIndex: 0, inStock: true },
  { name: 'Aluminum Laptop Riser Stand', price: 24.99, description: 'Foldable ventilated cooling stand with adjustable heights', categoryIndex: 0, inStock: false },

  // Audio & Headphones
  { name: 'Noise-Cancelling Wireless Headphones', price: 299.99, description: 'Active noise cancellation with 35-hour battery life', categoryIndex: 1, inStock: true },
  { name: 'True Wireless Sports Earbuds', price: 79.99, description: 'IPX7 sweatproof wireless earbuds with secure-fit ear hooks', categoryIndex: 1, inStock: true },
  { name: 'Studio Monitoring Headphones', price: 149.00, description: 'Flat-response wired over-ear headphones for audio mastering', categoryIndex: 1, inStock: true },
  { name: 'Portable Bluetooth Waterproof Speaker', price: 59.99, description: '360-degree sound with deep bass and floating design', categoryIndex: 1, inStock: true },
  { name: 'Desktop Soundbar with Subwoofer', price: 119.99, description: 'Compact stereo soundbar for PC setups and smart TVs', categoryIndex: 1, inStock: true },
  { name: 'USB Cardioid Condenser Microphone', price: 89.50, description: 'Studio quality recording mic for podcasting and streaming', categoryIndex: 1, inStock: true },
  { name: 'Boom Arm Microphone Stand', price: 32.00, description: 'Heavy-duty adjustable suspension boom scissor arm', categoryIndex: 1, inStock: true },
  { name: 'Hi-Fi In-Ear Audio Monitors (IEM)', price: 45.99, description: 'Dual hybrid driver in-ear monitors with detachable cable', categoryIndex: 1, inStock: true },
  { name: 'Compact Bluetooth Receiver DAC', price: 65.00, description: 'Wireless amplifier and DAC for wired headphones', categoryIndex: 1, inStock: true },
  { name: 'Acoustic Foam Soundproof Panels (12-pack)', price: 27.99, description: 'High-density sound absorbing wedge tiles for home studios', categoryIndex: 1, inStock: false },

  // Gaming Gear
  { name: 'Wireless Low-Latency Gaming Mouse', price: 69.99, description: '26K DPI optical sensor with 60g lightweight honeycomb body', categoryIndex: 2, inStock: true },
  { name: 'Compact 65% Mechanical Gaming Keyboard', price: 99.00, description: 'Pre-lubed linear switches and double-shot PBT keycaps', categoryIndex: 2, inStock: true },
  { name: 'Wireless Multi-Platform Gaming Controller', price: 59.99, description: 'Hall effect magnetic joysticks with zero drift technology', categoryIndex: 2, inStock: true },
  { name: '7.1 Surround Gaming Headset', price: 79.99, description: 'Breathable memory foam ear cushions with detachable boom mic', categoryIndex: 2, inStock: true },
  { name: 'Ergonomic High-Back Gaming Chair', price: 249.99, description: 'Lumbar support pillow, 4D armrests, and 165-degree recline', categoryIndex: 2, inStock: true },
  { name: 'Extended XL Desk Mat (900x400mm)', price: 19.99, description: 'Micro-woven cloth surface with anti-slip rubber base', categoryIndex: 2, inStock: true },
  { name: 'Flight Simulator Joystick & Throttle', price: 179.99, description: 'Dual-throttle HOTAS controller with customizable tension', categoryIndex: 2, inStock: true },
  { name: 'Racing Wheel with Floor Pedals', price: 299.00, description: 'Dual-motor force feedback racing wheel with 900-degree rotation', categoryIndex: 2, inStock: false },
  { name: 'Headphone Stand with USB 3.0 Hub', price: 22.99, description: 'Weighted aluminum headphone hanger with RGB base', categoryIndex: 2, inStock: true },
  { name: 'Capture Card 4K60 HDR Pass-through', price: 129.99, description: 'Zero-lag pass-through video recording for console streaming', categoryIndex: 2, inStock: true },

  // Smart Home & IoT
  { name: 'Smart Voice Assistant Hub', price: 89.99, description: 'Smart display with stereo speaker and smart home control center', categoryIndex: 3, inStock: true },
  { name: 'Smart Color LED Light Bulb (4-Pack)', price: 39.99, description: '16 million colors with voice control via Wi-Fi', categoryIndex: 3, inStock: true },
  { name: 'Smart Wi-Fi Video Doorbell', price: 119.00, description: '2K HD video with two-way audio and motion sensor alerts', categoryIndex: 3, inStock: true },
  { name: 'Indoor 360 Security Camera', price: 34.99, description: 'Pan and tilt night vision camera with motion tracking', categoryIndex: 3, inStock: true },
  { name: 'Smart Plug with Energy Monitoring (4-Pack)', price: 28.50, description: 'Schedule appliance power and track energy consumption', categoryIndex: 3, inStock: true },
  { name: 'Smart Programmable Thermostat', price: 139.99, description: 'Learns household temperature habits to reduce energy costs', categoryIndex: 3, inStock: true },
  { name: 'Automated Robot Vacuum & Mop', price: 399.00, description: 'LiDAR laser navigation with 4000Pa suction and self-emptying base', categoryIndex: 3, inStock: true },
  { name: 'Smart Ambient LED Light Bar Kit', price: 54.99, description: 'Backlight synchronization with PC monitors and televisions', categoryIndex: 3, inStock: true },
  { name: 'Keyless Smart Fingerprint Door Lock', price: 159.00, description: 'Biometric fingerprint, keypad passcode, and app unlock', categoryIndex: 3, inStock: false },
  { name: 'Smart Air Purifier with HEPA Filter', price: 109.99, description: 'Cleans air in rooms up to 500 sq ft with real-time PM2.5 display', categoryIndex: 3, inStock: true },

  // Wearables & Fitness
  { name: 'AMOLED Smart Fitness Watch', price: 179.99, description: 'All-day SpO2, heart rate monitoring, and built-in GPS', categoryIndex: 4, inStock: true },
  { name: 'Waterproof Slim Fitness Tracker', price: 49.99, description: '14-day battery life with sleep score and swim tracking', categoryIndex: 4, inStock: true },
  { name: 'Smart Bluetooth Body Composition Scale', price: 29.99, description: 'Measures body fat percentage, muscle mass, and BMI', categoryIndex: 4, inStock: true },
  { name: 'Deep Tissue Massage Gun', price: 69.99, description: '6 interchangeable massage heads with 30 adjustable speeds', categoryIndex: 4, inStock: true },
  { name: 'Smart Jump Rope with Digital Counter', price: 19.99, description: 'Tracks jump counts, calories, and time with companion app', categoryIndex: 4, inStock: true },
  { name: 'Heart Rate Monitor Chest Strap', price: 59.99, description: 'Dual Bluetooth & ANT+ connectivity for training precision', categoryIndex: 4, inStock: true },
  { name: 'Smart UV Sanitizer Sports Water Bottle', price: 44.99, description: 'Self-cleaning insulated stainless steel bottle with UV-C cap', categoryIndex: 4, inStock: true },
  { name: 'GPS Outdoor Multisport Watch', price: 349.00, description: 'Titanium bezel with offline topographical mapping', categoryIndex: 4, inStock: false },
  { name: 'Bone Conduction Open-Ear Headphones', price: 119.99, description: 'Safe situational awareness audio for runners and cyclists', categoryIndex: 4, inStock: true },
  { name: 'Recovery Air Compression Leg Boots', price: 449.00, description: 'Sequential air compression therapy for athletic recovery', categoryIndex: 4, inStock: true }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce_catalog';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB. Clearing old data...');

    await Category.deleteMany({});
    await Product.deleteMany({});

    console.log('Creating 5 categories...');
    const insertedCategories = await Category.insertMany(categoriesData);

    console.log('Creating 50 products linked to categories...');
    const productsToInsert = rawProducts.map(p => ({
      name: p.name,
      price: p.price,
      description: p.description,
      inStock: p.inStock,
      category: insertedCategories[p.categoryIndex]._id
    }));

    await Product.insertMany(productsToInsert);

    console.log('SUCCESS: Database populated with 50 products across 5 categories!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDB();