const u = (id, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`
const item = (id, name, category, price, rating, popularity, description, photo, extra = {}) =>
  ({ id, name, category, price, rating, popularity, description, image: u(photo), ...extra })

export const categories = [
  { name: 'Classic Burgers', emoji: '🍔', image: u('photo-1568901346375-23c9450c58cd', 600) },
  { name: 'Premium Burgers', emoji: '👑', image: u('photo-1586190848861-99aa4a171e90', 600) },
  { name: 'Chicken Burgers', emoji: '🐔', image: u('photo-1550547660-d9450f859349', 600) },
  { name: 'Pizza', emoji: '🍕', image: u('photo-1513104890138-7c749659a591', 600) },
  { name: 'Fries & Sides', emoji: '🍟', image: u('photo-1573080496219-bb080dd4f877', 600) },
  { name: 'Wraps & Sandwiches', emoji: '🌯', image: u('photo-1626700051175-6818013e1d4f', 600) },
  { name: 'Fried Chicken', emoji: '🍗', image: u('photo-1626645738196-c2a7c87a8f58', 600) },
  { name: 'Snacks', emoji: '🧀', image: u('photo-1531749668029-2db88e4276c7', 600) },
  { name: 'Desserts', emoji: '🍰', image: u('photo-1624353365286-3f8d62daad51', 600) },
  { name: 'Drinks & Shakes', emoji: '🥤', image: u('photo-1572490122747-3968b75cc699', 600) },
  { name: 'Combos', emoji: '🎁', image: u('photo-1594212699903-ec8a3eca50f5', 600) },
]

export const foods = [
  item(1, 'Classic Smash Burger', 'Classic Burgers', 9.5, 4.8, 98, 'Two smashed beef patties, melted cheddar, pickles and house sauce on a toasted bun.', 'photo-1568901346375-23c9450c58cd', { badge: 'Bestseller' }),
  item(2, 'Double Cheeseburger', 'Classic Burgers', 11.5, 4.7, 90, 'Twin patties, double American cheese, onions and mustard. Simple and stacked.', 'photo-1571091718767-18b5b1457add'),
  item(3, 'Bacon Melt', 'Classic Burgers', 12.25, 4.6, 80, 'Smoked bacon, caramelised onions and Swiss cheese on a griddled bun.', 'photo-1553979459-d2229ba7433b'),
  item(4, 'Truffle Stack', 'Premium Burgers', 16.9, 4.9, 93, 'Dry-aged beef, truffle mayo, gruyère and crispy shallots on a brioche bun.', 'photo-1586190848861-99aa4a171e90', { badge: 'New' }),
  item(5, 'BBQ Brisket Burger', 'Premium Burgers', 14.5, 4.7, 85, 'Slow-smoked brisket, smoky BBQ glaze, cheddar and pickled slaw.', 'photo-1594212699903-ec8a3eca50f5'),
  item(6, 'Blue Cheese Angus', 'Premium Burgers', 15.25, 4.5, 70, 'Black Angus patty, creamy blue cheese, rocket and fig relish.', 'photo-1561758033-d89a9ad46330'),
  item(7, 'Crispy Chicken Burger', 'Chicken Burgers', 8.75, 4.6, 88, 'Buttermilk-fried chicken thigh, slaw and spicy mayo in a soft brioche bun.', 'photo-1550547660-d9450f859349'),
  item(8, 'Nashville Hot Chicken', 'Chicken Burgers', 10.25, 4.8, 91, 'Fiery cayenne-glazed chicken, pickles and cooling ranch.', 'photo-1606755962773-d324e0a13086', { badge: 'Spicy' }),
  item(9, 'Lemon Herb Grilled Chicken', 'Chicken Burgers', 9.75, 4.4, 66, 'Char-grilled chicken breast, lemon-herb dressing, lettuce and tomato.', 'photo-1521305916504-4a1121188589'),
  item(10, 'Margherita Pizza', 'Pizza', 11, 4.7, 92, 'Stone-baked base, tomato, fresh mozzarella and basil.', 'photo-1513104890138-7c749659a591'),
  item(11, 'Pepperoni Feast', 'Pizza', 12.5, 4.9, 96, 'Double pepperoni, mozzarella and a drizzle of hot honey.', 'photo-1628840042765-356cda07504e', { badge: 'Bestseller' }),
  item(12, 'BBQ Chicken Pizza', 'Pizza', 13.25, 4.5, 74, 'Smoky BBQ sauce, roast chicken, red onion and sweetcorn.', 'photo-1565299624946-b28f40a0ae38'),
  item(13, 'Golden Shoestring Fries', 'Fries & Sides', 3.99, 4.3, 87, 'Thin, crisp and salted the moment they leave the fryer.', 'photo-1573080496219-bb080dd4f877'),
  item(14, 'Loaded Cheese Fries', 'Fries & Sides', 5.99, 4.7, 89, 'Fries under cheese sauce, jalapeños and crunchy onions.', 'photo-1585109649139-366815a0d713'),
  item(15, 'Beer-Battered Onion Rings', 'Fries & Sides', 4.5, 4.4, 68, 'Thick-cut rings in a crisp golden batter with smoky dip.', 'photo-1639024471283-03518883512d'),
  item(16, 'Chicken Caesar Wrap', 'Wraps & Sandwiches', 8.5, 4.5, 72, 'Grilled chicken, cos lettuce, parmesan and Caesar dressing in a toasted wrap.', 'photo-1626700051175-6818013e1d4f'),
  item(17, 'Triple Decker Club', 'Wraps & Sandwiches', 9.25, 4.6, 69, 'Turkey, bacon, egg, tomato and lettuce on toasted sourdough.', 'photo-1528735602780-2552fd46c7af'),
  item(18, 'Falafel Veggie Wrap', 'Wraps & Sandwiches', 7.75, 4.4, 61, 'Crisp falafel, hummus, pickled cabbage and tahini.', 'photo-1593001874117-c99c800e3eb7'),
  item(19, 'Crispy Fried Chicken (4 pc)', 'Fried Chicken', 11.5, 4.8, 94, 'Eleven-spice crust, juicy inside, served with dip.', 'photo-1626645738196-c2a7c87a8f58', { badge: 'Bestseller' }),
  item(20, 'Spicy Chicken Tenders', 'Fried Chicken', 8.9, 4.5, 77, 'Five hand-breaded tenders with a chilli kick and honey mustard.', 'photo-1562967914-608f82629710'),
  item(21, 'Honey Garlic Wings', 'Fried Chicken', 9.5, 4.7, 83, 'Eight wings tossed in sticky honey-garlic glaze and sesame.', 'photo-1608039829572-78524f79c4c7'),
  item(22, 'Golden Nuggets (10 pc)', 'Snacks', 6.5, 4.3, 79, 'Crunchy bite-size nuggets with your choice of dip.', 'photo-1599487488170-d11ec9c172f0'),
  item(23, 'Mozzarella Sticks', 'Snacks', 6.75, 4.6, 75, 'Crumbed, fried and stretchy, with marinara.', 'photo-1531749668029-2db88e4276c7'),
  item(24, 'Jalapeño Poppers', 'Snacks', 6.25, 4.4, 64, 'Cream-cheese filled jalapeños with a crisp crumb.', 'photo-1541592106381-b31e9677c0e5', { badge: 'Spicy' }),
  item(25, 'Chocolate Lava Cake', 'Desserts', 6.5, 4.9, 95, 'Warm dark chocolate cake with a molten centre and vanilla cream.', 'photo-1624353365286-3f8d62daad51', { badge: 'Bestseller' }),
  item(26, 'Glazed Donut Trio', 'Desserts', 5.25, 4.5, 76, 'Three soft glazed donuts with sprinkles.', 'photo-1551024601-bec78aea704b'),
  item(27, 'Vanilla Bean Sundae', 'Desserts', 4.75, 4.4, 65, 'Soft-serve, hot fudge, crushed nuts and a cherry.', 'photo-1563805042-7684c019e1cb'),
  item(28, 'Fresh Lemon Mint Cooler', 'Drinks & Shakes', 3.5, 4.6, 82, 'Hand-squeezed lemon, mint and sparkling water over ice.', 'photo-1544145945-f90425340c7e'),
  item(29, 'Mango Lassi', 'Drinks & Shakes', 4.25, 4.8, 86, 'Chilled yoghurt blended with ripe mango and a pinch of cardamom.', 'photo-1553530666-ba11a7da3888'),
  item(30, 'Chocolate Milkshake', 'Drinks & Shakes', 5.5, 4.7, 84, 'Thick, cold and made with real chocolate.', 'photo-1572490122747-3968b75cc699'),
  item(31, 'Classic Burger Combo', 'Combos', 13.5, 4.8, 97, 'Smash burger, shoestring fries and a lemon mint cooler.', 'photo-1594212699903-ec8a3eca50f5', { oldPrice: 16.5, badge: 'Deal' }),
  item(32, 'Family Feast Box', 'Combos', 39.9, 4.9, 89, '8 pc fried chicken, 2 burgers, large fries, onion rings and 4 drinks.', 'photo-1626645738196-c2a7c87a8f58', { oldPrice: 49.5, badge: 'Deal' }),
  item(33, 'Pizza & Shake Duo', 'Combos', 16.9, 4.6, 81, 'Any pepperoni or margherita pizza with a chocolate milkshake.', 'photo-1628840042765-356cda07504e', { oldPrice: 20.5, badge: 'Deal' }),
]

export const reviews = [
  { id: 1, name: 'Sample Customer A', role: 'Burger fan', text: 'The smash burger is juicy and the fries stay crisp. Exactly what a menu page should make you feel.', rating: 5 },
  { id: 2, name: 'Sample Customer B', role: 'Lunch regular', text: 'Search, add, checkout: quick and clear. The cart even survived a refresh.', rating: 5 },
  { id: 3, name: 'Sample Customer C', role: 'Dessert lover', text: 'That lava cake photo alone made me hungry. The combo deals are a nice touch too.', rating: 4 },
  { id: 4, name: 'Sample Customer D', role: 'Weekend host', text: 'The Family Feast Box looks perfect for game night. Love the clean layout on my phone.', rating: 5 },
]

export const stats = [
  { label: 'Dishes on the menu', value: foods.length, suffix: '' },
  { label: 'Average dish rating', value: 4.7, suffix: '', decimals: 1 },
  { label: 'Sample orders served', value: 12000, suffix: '+' },
  { label: 'Avg. prep time (sample)', value: 15, suffix: ' min' },
]

export const formatPrice = (n) => `$${n.toFixed(2)}`
export const DELIVERY_FEE = 3.99
