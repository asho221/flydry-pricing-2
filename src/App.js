import React, { useState, useEffect } from 'react';
import { Plus, Minus, Info, Trash2, Search, Sparkles, Store, Truck, Droplet, Scissors, Shirt, Home, Wind } from 'lucide-react';

// --- FLYDRY STRUCTURED MASTER CATALOG ---
const MENU = {
  cleaning: [
    { id: 'c_shirt', name: 'Shirt', price: 3.00, bundle: { qty: 5, price: 10.00 }, desc: '5 for £10 Offer' },
    { id: 'c_trouser', name: 'Trousers', price: 6.00, bundle: { qty: 5, price: 25.00 }, desc: '5 for £25 Offer' },
    { id: 'c_jeans', name: 'Jeans', price: 5.00 },
    { id: 'c_tracksuit', name: 'Tracksuit Set', price: 15.00 },
    { id: 'c_suit_2', name: '2-Piece Suit', price: 12.00, bundle: { qty: 2, price: 22.00 }, desc: '2 for £22 Offer' },
    { id: 'c_suit_3', name: '3-Piece Suit', price: 16.00 },
    { id: 'c_blazer', name: 'Blazer', price: 8.00 },
    { id: 'c_light_jacket', name: 'Light Jacket / Coat', price: 15.00, startingPrice: true },
    { id: 'c_overcoat', name: 'Overcoat / Heavy Coat', price: 20.00 },
    { id: 'c_trench_coat_sm', name: 'Trench Coat (S/M)', price: 18.00, startingPrice: true },
    { id: 'c_trench_coat_l', name: 'Trench Coat (L)', price: 20.00, startingPrice: true },
    { id: 'c_dress', name: 'Dress (Standard)', price: 10.00 },
    { id: 'c_dress_evening', name: 'Dress (Evening/Long)', price: 15.00, startingPrice: true },
    { id: 'c_dress_wedding', name: 'Wedding Dress', price: 80.00, startingPrice: true },
    { id: 'c_winter_jacket', name: 'Winter Jacket (M)', price: 25.00, startingPrice: true },
    { id: 'c_winter_jacket_l', name: 'Winter Jacket (L)', price: 30.00, startingPrice: true },
    { id: 'c_jacket_premium', name: 'Premium/Down Jacket', price: 40.00, startingPrice: true },
    { id: 'c_jacket_designer', name: 'Designer Coat (e.g. Canada Goose)', price: 50.00, startingPrice: true },
    { id: 'c_tshirt', name: 'T-Shirt', price: 4.00 },
    { id: 'c_jumper', name: 'Jumper / Knitwear', price: 7.00 },
    { id: 'c_laundry_kg', name: 'Wash & Fold (per KG)', price: 3.50 },
    { id: 'c_trainers', name: 'Trainers Cleaning', price: 15.00, startingPrice: true }
  ],
  repairs: [
    { id: 'r_stitch', name: 'Minor Stitch / Tear', price: 8.00 },
    { id: 'r_button', name: 'Fix / Replace Button', price: 5.00 },
    { id: 'r_trouser_shorten', name: 'Trousers: Shorten / Lengthen', price: 12.00 },
    { id: 'r_trouser_taper', name: 'Trousers: Taper', price: 20.00 },
    { id: 'r_trouser_waist', name: 'Trousers: Adjust Waist', price: 15.00 },
    { id: 'r_zip_standard', name: 'New Zip (Standard)', price: 15.00 },
    { id: 'r_zip_jacket', name: 'New Zip (Jacket/Coat)', price: 25.00, startingPrice: true },
    { id: 'r_dress_shorten', name: 'Dress: Shorten', price: 15.00, startingPrice: true },
    { id: 'r_dress_taper', name: 'Dress: Taper', price: 20.00, startingPrice: true },
    { id: 'r_jacket_shorten', name: 'Jacket: Shorten Sleeves', price: 35.00 },
  ],
  home: [
    { id: 'h_duvet_single', name: 'Duvet (Single)', price: 20.00 },
    { id: 'h_duvet_double', name: 'Duvet (Double)', price: 25.00 },
    { id: 'h_duvet_king', name: 'Duvet (King)', price: 30.00 },
    { id: 'h_duvet_feather', name: 'Feather Duvet (Any Size)', price: 40.00 },
    { id: 'h_bed_set', name: 'Bed Set', price: 15.00, desc: 'Sheet, duvet cover, 2 pillow cases' },
    { id: 'h_pillow', name: 'Pillow (Standard)', price: 10.00 },
    { id: 'h_pillow_feather', name: 'Pillow (Feather)', price: 15.00 },
    { id: 'h_pillow_case', name: 'Pillow Case', price: 2.00 },
    { id: 'h_towel_l', name: 'Towel (Large)', price: 3.50 },
    { id: 'h_towel_s', name: 'Towel (Small)', price: 1.50 },
    { id: 'h_curtain_light', name: 'Curtains (Light)', price: 10.00 },
    { id: 'h_curtain_heavy', name: 'Curtains (Heavy/Blackout)', price: 25.00 },
    { id: 'h_rug_small', name: 'Rug (Small)', price: 45.00, startingPrice: true },
    { id: 'h_rug_big', name: 'Rug (Big)', price: 100.00, startingPrice: true },
  ],
  ironing: [
    { id: 'i_shirt', name: 'Shirt (Iron Only)', price: 2.00 },
    { id: 'i_tshirt', name: 'T-Shirt (Iron Only)', price: 2.00 },
    { id: 'i_trouser', name: 'Trousers (Iron Only)', price: 3.50 },
    { id: 'i_jeans', name: 'Jeans (Iron Only)', price: 3.00 },
    { id: 'i_shorts', name: 'Shorts (Iron Only)', price: 3.50 },
    { id: 'i_skirt', name: 'Skirt (Iron Only)', price: 3.50 },
    { id: 'i_skirt_pleated', name: 'Skirt - Pleated (Iron Only)', price: 6.00 },
    { id: 'i_dress', name: 'Dress (Iron Only)', price: 6.00 },
    { id: 'i_dress_long', name: 'Dress - Long (Iron Only)', price: 8.00 },
    { id: 'i_jumpsuit', name: 'Jump Suit (Iron Only)', price: 2.50 },
    { id: 'i_suit_2', name: 'Suit - Two Piece (Iron Only)', price: 7.00 },
    { id: 'i_jacket', name: 'Jacket (Iron Only)', price: 5.00 },
    { id: 'i_coat', name: 'Coat (Iron Only)', price: 6.99 },
    { id: 'i_tie', name: 'Tie (Iron Only)', price: 1.50 },
    { id: 'i_socks', name: 'Socks (Iron Only)', price: 1.10 },
  ]
};

export default function FlyDryEstimator() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('cleaning');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Basket Toggles
  const [deliveryMode, setDeliveryMode] = useState('pickup'); // 'pickup' | 'store'
  const [hasStains, setHasStains] = useState(false);
  const [discountType, setDiscountType] = useState('percent'); // 'percent' | 'amount'
  const [discountValue, setDiscountValue] = useState('');

  // Filter items based on search
  const getVisibleItems = () => {
    let items = MENU[activeCategory];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      // If searching, search across ALL categories
      items = [
        ...MENU.cleaning.map(i => ({...i, cat: 'Cleaning'})), 
        ...MENU.ironing.map(i => ({...i, cat: 'Ironing'})),
        ...MENU.repairs.map(i => ({...i, cat: 'Repair'})), 
        ...MENU.home.map(i => ({...i, cat: 'Home'}))
      ].filter(item => item.name.toLowerCase().includes(q));
    }
    return items;
  };

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    // Clear search after adding if they used search
    if (searchQuery) setSearchQuery('');
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(0, item.qty + delta) };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id));

  // Advanced Pricing Engine
  const getTotals = () => {
    let subtotal = 0;
    let hasStartingPriceItems = false;

    cart.forEach(item => {
      if (item.startingPrice) hasStartingPriceItems = true;
      if (item.bundle) {
        const bundles = Math.floor(item.qty / item.bundle.qty);
        const singles = item.qty % item.bundle.qty;
        subtotal += (bundles * item.bundle.price) + (singles * item.price);
      } else {
        subtotal += (item.price * item.qty);
      }
    });

    let minimumTopUp = 0;
    let deliveryFee = 0;

    if (subtotal > 0 && deliveryMode === 'pickup') {
      if (subtotal < 25) minimumTopUp = 25 - subtotal;
      if (subtotal < 50) deliveryFee = 2.00;
    }

    // Calculate discount strictly against the subtotal
    let discountAmount = 0;
    const val = parseFloat(discountValue) || 0;
    if (val > 0) {
      if (discountType === 'percent') {
        discountAmount = subtotal * (val / 100);
      } else {
        discountAmount = val;
      }
    }
    // Ensure discount doesn't exceed the subtotal itself
    discountAmount = Math.min(discountAmount, subtotal);

    return {
      subtotal,
      minimumTopUp,
      deliveryFee,
      discountAmount,
      total: subtotal - discountAmount + minimumTopUp + deliveryFee,
      hasStartingPriceItems
    };
  };

  const totals = getTotals();
  const visibleItems = getVisibleItems();

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row font-sans text-gray-800 h-[85vh] min-h-[600px] md:h-[800px]">
      
      {/* LEFT PANE: Guided Service Menu */}
      <div className="flex-1 flex flex-col bg-gray-50 border-r border-gray-200">
        
        {/* Header & Search */}
        <div className="bg-[#114232] px-6 py-6 shadow-md z-10">
          <h2 className="text-white font-bold text-xl sm:text-2xl tracking-tight mb-4">Select services to see a guided price</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items (e.g. Shirts, Zip repair...)"
              className="w-full bg-white border-none text-gray-800 text-md rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Category Tabs (Hide if searching) */}
        {!searchQuery && (
          <div className="flex px-4 pt-4 gap-2 bg-gray-50 border-b border-gray-200 overflow-x-auto">
            <button 
              onClick={() => setActiveCategory('cleaning')}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-t-xl transition-colors whitespace-nowrap ${activeCategory === 'cleaning' ? 'bg-white text-[#114232] border-t border-l border-r border-gray-200 shadow-[0_-2px_4px_rgba(0,0,0,0.02)]' : 'text-gray-500 hover:text-gray-800'}`}
            >
              <Shirt size={16} /> Clean & Press
            </button>
            <button 
              onClick={() => setActiveCategory('repairs')}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-t-xl transition-colors whitespace-nowrap ${activeCategory === 'repairs' ? 'bg-white text-[#114232] border-t border-l border-r border-gray-200 shadow-[0_-2px_4px_rgba(0,0,0,0.02)]' : 'text-gray-500 hover:text-gray-800'}`}
            >
              <Scissors size={16} /> Alterations & Repairs
            </button>
            <button 
              onClick={() => setActiveCategory('home')}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-t-xl transition-colors whitespace-nowrap ${activeCategory === 'home' ? 'bg-white text-[#114232] border-t border-l border-r border-gray-200 shadow-[0_-2px_4px_rgba(0,0,0,0.02)]' : 'text-gray-500 hover:text-gray-800'}`}
            >
              <Home size={16} /> Bedding & Home
            </button>
            <button 
              onClick={() => setActiveCategory('ironing')}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-t-xl transition-colors whitespace-nowrap ${activeCategory === 'ironing' ? 'bg-white text-[#114232] border-t border-l border-r border-gray-200 shadow-[0_-2px_4px_rgba(0,0,0,0.02)]' : 'text-gray-500 hover:text-gray-800'}`}
            >
              <Wind size={16} /> Iron Only
            </button>
          </div>
        )}

        {/* Item Grid */}
        <div className="flex-1 p-6 overflow-y-auto bg-white">
          {searchQuery && <p className="text-sm text-gray-500 font-bold mb-4 uppercase tracking-wider">Search Results</p>}
          
          {activeCategory === 'cleaning' && !searchQuery && (
            <div className="mb-5 p-3 bg-[#114232]/5 border border-[#114232]/10 rounded-xl flex items-start gap-2 text-[#114232] text-[12px] font-medium">
              <Sparkles size={16} className="mt-0.5 shrink-0 text-[#C5A059]" />
              <p>Professional pressing is included as standard with our cleaning services (excludes Wash & Fold).</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleItems.map(item => (
              <button 
                key={item.id}
                onClick={() => addToCart(item)}
                className="flex flex-col justify-between text-left p-4 rounded-xl border border-gray-200 hover:border-[#114232] hover:shadow-md transition-all group bg-white"
              >
                <div>
                  {item.cat && <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider block mb-1">{item.cat}</span>}
                  <h3 className="font-bold text-gray-800 leading-tight group-hover:text-[#114232]">{item.name}</h3>
                  {item.desc && (
                    <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold bg-[#C5A059]/10 text-[#9b7e46] px-1.5 py-0.5 rounded">
                      <Sparkles size={10} /> {item.desc}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-end mt-4 w-full">
                  <span className="font-bold text-[#114232]">
                    {item.startingPrice && <span className="text-xs font-normal text-gray-500 mr-1">From</span>}
                    £{item.price.toFixed(2)}
                  </span>
                  <div className="bg-gray-100 p-1.5 rounded-lg text-gray-500 group-hover:bg-[#114232] group-hover:text-white transition-colors">
                    <Plus size={14} />
                  </div>
                </div>
              </button>
            ))}
            
            {visibleItems.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-400">
                <Search size={32} className="mx-auto mb-3 opacity-30" />
                <p>No items found. Try a different search term.</p>
              </div>
            )}
          </div>
          
          <div className="mt-8 p-4 bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-xl text-center">
            <p className="text-sm text-[#7a6234] font-medium flex items-center justify-center gap-2">
              <Info size={16} className="shrink-0" />
              Many items are not listed here. Please check our full price list or contact us directly for specific quotes!
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANE: The Live Basket & Options */}
      <div className="w-full md:w-[420px] bg-gray-50/50 flex flex-col border-l border-gray-200">
        
        <div className="p-6 border-b border-gray-200 bg-white flex justify-between items-center shadow-sm z-10">
          <h3 className="font-bold text-gray-800 text-lg">Your Basket</h3>
          <span className="text-xs font-bold bg-[#114232] text-white px-2.5 py-1 rounded-full shadow-sm">
            {cart.reduce((sum, item) => sum + item.qty, 0)} Items
          </span>
        </div>

        {/* Easy Multiple Choice Options */}
        <div className="p-5 border-b border-gray-200 bg-white space-y-5">
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2.5">Service Preference</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setDeliveryMode('pickup')}
                className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all ${deliveryMode === 'pickup' ? 'border-[#114232] bg-[#114232]/5 text-[#114232]' : 'border-gray-100 hover:border-gray-300 text-gray-500'}`}
              >
                <Truck size={18} />
                <span className="text-xs font-bold">Collection</span>
              </button>
              <button 
                onClick={() => setDeliveryMode('store')}
                className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all ${deliveryMode === 'store' ? 'border-[#114232] bg-[#114232]/5 text-[#114232]' : 'border-gray-100 hover:border-gray-300 text-gray-500'}`}
              >
                <Store size={18} />
                <span className="text-xs font-bold">Store Drop-off</span>
              </button>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2.5">Any Heavy Stains?</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setHasStains(false)}
                className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${!hasStains ? 'border-[#114232] bg-[#114232] text-white shadow-md' : 'border-gray-100 hover:border-gray-300 text-gray-500'}`}
              >
                No Stains
              </button>
              <button 
                onClick={() => setHasStains(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${hasStains ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#9b7e46]' : 'border-gray-100 hover:border-gray-300 text-gray-500'}`}
              >
                <Droplet size={14} /> Yes
              </button>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2.5">Discount Code</p>
            <div className="flex gap-2">
              <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-200">
                <button 
                  onClick={() => setDiscountType('percent')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${discountType === 'percent' ? 'bg-white shadow-sm text-[#114232]' : 'text-gray-500 hover:text-gray-800'}`}
                >%</button>
                <button 
                  onClick={() => setDiscountType('amount')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${discountType === 'amount' ? 'bg-white shadow-sm text-[#114232]' : 'text-gray-500 hover:text-gray-800'}`}
                >£</button>
              </div>
              <input 
                type="number" 
                placeholder={discountType === 'percent' ? 'e.g. 10' : 'e.g. 5.00'}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                min="0"
                className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-5 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 mt-10 flex flex-col items-center gap-3">
              <Shirt size={40} className="opacity-20 mb-2" />
              <p className="text-sm font-medium px-6">Select items from the menu to build your estimate.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => {
                let lineTotal = 0;
                let showPromo = false;
                if (item.bundle && item.qty >= item.bundle.qty) {
                   const bundles = Math.floor(item.qty / item.bundle.qty);
                   const singles = item.qty % item.bundle.qty;
                   lineTotal = (bundles * item.bundle.price) + (singles * item.price);
                   showPromo = true;
                } else {
                   lineTotal = item.price * item.qty;
                }

                // Identify if it's a repair or home item for badge
                const isRepair = item.id.startsWith('r_');
                const isHome = item.id.startsWith('h_');
                const isIroning = item.id.startsWith('i_');

                return (
                  <div key={item.id} className="group border border-gray-200 bg-white rounded-xl p-3 shadow-sm hover:border-[#C5A059] transition-colors relative overflow-hidden">
                    
                    {/* Category Color Bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${isRepair ? 'bg-[#C5A059]' : isHome ? 'bg-blue-400' : isIroning ? 'bg-purple-400' : 'bg-[#114232]'}`}></div>

                    <div className="flex justify-between items-start mb-3 pl-2">
                      <div>
                        {isRepair && <span className="text-[9px] font-bold text-[#C5A059] uppercase tracking-wider block mb-0.5">Alteration</span>}
                        {isIroning && <span className="text-[9px] font-bold text-purple-500 uppercase tracking-wider block mb-0.5">Ironing</span>}
                        <span className="text-[14px] font-bold text-gray-800">
                          {item.name}
                          {item.startingPrice && <span className="text-[10px] text-[#C5A059] ml-1.5 font-bold uppercase">(Starts at)</span>}
                        </span>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center pl-2">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                        <button onClick={() => updateQty(item.id, -1)} className="p-1 text-gray-400 hover:text-[#114232]"><Minus size={14} /></button>
                        <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="p-1 text-gray-400 hover:text-[#114232]"><Plus size={14} /></button>
                      </div>
                      
                      <span className="text-lg font-bold text-[#114232]">
                        {item.startingPrice && <span className="text-sm font-normal text-gray-500 mr-1">From</span>}
                        £{lineTotal.toFixed(2)}
                      </span>
                    </div>

                    {showPromo && (
                      <div className="mt-3 ml-2 flex items-center gap-1.5 text-[11px] text-[#114232] font-bold bg-[#114232]/10 px-2 py-1 rounded w-max">
                        <Sparkles size={12} /> {item.bundle.qty} for £{item.bundle.price.toFixed(2)} Applied
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Total & Disclaimer */}
        <div className="p-6 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-10">
          
          {/* Free Delivery Upsell Prompt */}
          {cart.length > 0 && deliveryMode === 'pickup' && totals.subtotal < 50 && (
            <div className="mb-4 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-xl p-3 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-[#C5A059] p-1.5 rounded-full text-white shrink-0">
                <Truck size={14} />
              </div>
              <p className="text-[12px] text-[#7a6234] font-medium leading-tight">
                Add <strong>£{(50 - totals.subtotal).toFixed(2)}</strong> more to your basket to get <strong className="text-[#114232]">FREE</strong> Collection & Delivery!
              </p>
            </div>
          )}

          {/* Subtotal & Fees Breakdown */}
          {cart.length > 0 && (
            <div className="mb-4 space-y-2.5 border-b border-gray-100 pb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Items Subtotal</span>
                <span className="font-semibold">£{totals.subtotal.toFixed(2)}</span>
              </div>

              {totals.discountAmount > 0 && (
                <div className="flex justify-between text-sm text-[#C5A059] font-medium">
                  <span>Discount ({discountType === 'percent' ? `${discountValue}%` : `£${discountValue}`})</span>
                  <span>-£{totals.discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              {deliveryMode === 'pickup' && (
                <>
                  {totals.minimumTopUp > 0 && (
                    <div className="flex justify-between text-sm text-orange-600">
                      <span>Minimum Order Top-up</span>
                      <span>+£{totals.minimumTopUp.toFixed(2)}</span>
                    </div>
                  )}
                  {totals.deliveryFee > 0 ? (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Collection & Delivery Fee</span>
                      <span>+£{totals.deliveryFee.toFixed(2)}</span>
                    </div>
                  ) : (
                    totals.subtotal >= 50 && (
                      <div className="flex justify-between text-sm text-[#114232] font-bold">
                        <span>Collection & Delivery</span>
                        <span>FREE (Over £50)</span>
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          )}

          <div className="flex justify-between items-end mb-5">
            <span className="text-[13px] text-gray-500 font-bold uppercase tracking-widest">Total Guide</span>
            <span className="text-4xl font-black text-[#114232] tracking-tight">
              {totals.hasStartingPriceItems && <span className="text-xl font-normal text-gray-400 mr-1">From</span>}
              £{totals.total.toFixed(2)}
            </span>
          </div>
          
          <div className="flex flex-col gap-2">
            {hasStains && (
              <div className="flex items-start gap-2 bg-[#C5A059]/10 border border-[#C5A059]/30 p-3 rounded-lg">
                <Info className="text-[#9b7e46] shrink-0 mt-0.5" size={14} />
                <p className="text-[11px] text-[#7a6234] leading-tight font-medium">
                  Stains noted. A specialist stain removal upcharge may be applied upon inspection.
                </p>
              </div>
            )}
            <div className="flex items-start gap-2 bg-gray-50 border border-gray-200 p-3 rounded-lg">
              <Info className="text-gray-400 shrink-0 mt-0.5" size={14} />
              <p className="text-[11px] text-gray-500 leading-tight">
                This estimate is a guide. {totals.hasStartingPriceItems && <strong>Items marked "Starts at" are subject to inspection. </strong>} Final pricing is confirmed on collection.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
