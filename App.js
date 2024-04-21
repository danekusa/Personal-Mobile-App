// App.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';

const App = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFood, setIsFood] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const foodImages = [
    'https://www.utphysicians.com/wp-content/uploads/2022/02/fruits-and-vegetables-rainbow.jpg',
    'https://downtownproduce.com/wp-content/uploads/2023/04/Assorted-Meats-Seafood-and-Veggies.jpg ',
    'https://whisk.com/wp-content/uploads/2023/02/shutterstock_1679020255.jpg',
    'https://preview.redd.it/ecgwgndlhqv71.jpg?width=1200&format=pjpg&auto=webp&s=3d8a3b120490d5fe0de6e81ee069444b47ee37d6',
    'https://wildpackbev.com/wp-content/uploads/2022/01/How-Much-is-the-Beverage-Industry-Worth.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % foodImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const categories = ['Fruits & Vegetables', 'Meat & Seafood', 'Dairy & Eggs', 'Bakery', 'Pantry', 'Beverages'];
  const categoryMenuItems = {
    'Fruits & Vegetables': [
      { name: 'Apple', price: 2.5, image: 'https://static.wikia.nocookie.net/fruits-information/images/2/2b/Apple.jpg/revision/latest?cb=20180802112257' },
      { name: 'Banana', price: 1.5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLY5XJt6ORLWtGfPSXJPkFqfdG0hzLmDbbZsuo-Bp1Dw&s' },
      { name: 'Carrot', price: 1, image: 'https://cdn11.bigcommerce.com/s-kc25pb94dz/images/stencil/1280x1280/products/271/762/Carrot__40927.1634584458.jpg?c=2' },
    ],
    'Meat & Seafood': [
      { name: 'Chicken Breast', price: 5, image: 'https://www.foodiecrush.com/wp-content/uploads/2018/08/Instant-Pot-Chicken-Breasts-foodiecrush.com-006A.jpg' },
      { name: 'Salmon Fillet', price: 8, image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2021/01/Baked-Salmon-1-2.jpg' },
      { name: 'Shrimp', price: 10, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3b7hszmnH_XOP8bZ7335_6DcmFuKuMVdPvMEHGuLfww&s' },
    ],
    'Dairy & Eggs': [
      { name: 'Milk', price: 3, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Oat_milk_glass_and_bottles.jpg/640px-Oat_milk_glass_and_bottles.jpg' },
      { name: 'Eggs', price: 2, image: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/5225/n0818h16207257468821.jpg' },
      { name: 'Cheese', price: 4, image: 'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/milk-dairy/2-1-3-1dairyfoods_cheese_detailfeature_thumb.jpg?sfvrsn=aba8c621_4' },
    ],
    'Bakery': [
      { name: 'Bread', price: 2, image: 'https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/16:9/w_4000,h_2250,c_limit/milk-bread.jpg' },
      { name: 'Croissant', price: 3, image: 'https://static01.nyt.com/images/2021/04/07/dining/06croissantsrex1/merlin_184841898_ccc8fb62-ee41-44e8-9ddf-b95b198b88db-threeByTwoMediumAt2X.jpg' },
      { name: 'Bagel', price: 1.5, image: 'https://preppykitchen.com/wp-content/uploads/2023/01/Bagel-Recipe-Recipe-Card.jpg' },
    ],
    'Pantry': [
      { name: 'Rice', price: 4, image: 'https://www.world-grain.com/ext/resources/2022/10/25/Rice_AdobeStock_64819529_E.jpg?height=667&t=1666706505&width=1080' },
      { name: 'Pasta', price: 3, image: 'https://static.vecteezy.com/system/resources/previews/014/445/747/large_2x/raw-pasta-various-kinds-of-uncooked-pasta-macaroni-spaghetti-and-noodles-on-background-top-view-italian-food-culinary-concept-collection-of-different-raw-pasta-on-cooking-table-for-cooking-food-free-photo.JPG' },
      { name: 'Canned Beans', price: 2.5, image: 'https://michiganrunnergirl.com/wp-content/uploads/2020/04/IMG-3550-1024x768.jpg' },
    ],
    'Beverages': [
      { name: 'Water', price: 1, image: 'https://www.factsaboutbpa.org/wp-content/uploads/2017/09/waterbottles.png' },
      { name: 'Juice', price: 3, image: 'https://t4.ftcdn.net/jpg/01/25/50/31/360_F_125503120_ZNGEPVQZEvHrTH18jT0g58pMlM5mP4Np.jpg' },
      { name: 'Soda', price: 2, image: 'https://palrancho.co/atlantic/wp-content/uploads/2023/01/Bottle-Soda.jpg' },
    ],
  };

  useEffect(() => {
    handleCategoryChange(categories[0]); // Set initial category
  }, []);

  const login = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUsername('');
    setIsLoggedIn(false);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handlePayment = (method) => {
    // Logic for handling payment
    setPaymentMethod(method);
    setShowPaymentModal(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setMenuItems(categoryMenuItems[category]);
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>EasyBasket: An Online Grocery App</Text>
        </View>
        <View style={styles.loginContainer}>
          {isLoggedIn ? (
            <View>
              <Text style={styles.loginText}>Welcome, {username}!</Text>
              <Button title="Logout" onPress={logout} />
            </View>
          ) : (
            <View>
              <Text style={styles.loginText}>Please log in to continue.</Text>
              <Button title="Login as User123" onPress={() => login('User123')} />
            </View>
          )}
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.promotions}>
          {isLoggedIn && (
            <>
              <Text style={styles.promotionText}>Get 10% off on all orders above $50! Use code EASY10.</Text>
              <Text style={styles.promotionText}>Free delivery on your first order. No minimum purchase required.</Text>
            </>
          )}
        </View>
        <View style={styles.carouselContainer}>
          <Image source={{ uri: isFood ? foodImages[currentImageIndex] : meatImages[currentImageIndex] }} style={styles.carouselImage} />
        </View>
        <View style={styles.dashboard}>
          <Text style={styles.sectionTitle}>Menu Dashboard</Text>
          <View style={styles.categoryList}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} onPress={() => handleCategoryChange(category)} style={styles.categoryButton}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
            {isLoggedIn && (
              <TouchableOpacity onPress={logout} style={styles.categoryButton}>
                <Text style={styles.categoryText}>Logout</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.menuItems}>
          <Text style={styles.sectionTitle}>{selectedCategory}</Text>
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            <Image source={require('./assets/search.png')} style={styles.searchIcon} />
          </View>
          {filteredMenuItems.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <Button title="Add to Cart" onPress={() => addToCart(item)} />
            </View>
          ))}
        </View>
        <View style={styles.cart}>
          <Text style={styles.sectionTitle}>Cart</Text>
          {cart.map((item, index) => (
            <View key={index}>
              <Text>{item.name} - ${item.price}</Text>
              <Button title="Remove" onPress={() => removeFromCart(index)} />
            </View>
          ))}
          <Button title="Proceed to Payment" onPress={() => setShowPaymentModal(true)} />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showPaymentModal}
          onRequestClose={() => setShowPaymentModal(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Payment Method</Text>
            <TouchableOpacity style={styles.paymentButton} onPress={() => handlePayment('Apple Pay')}>
              <Text style={styles.paymentButtonText}>Apple Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton} onPress={() => handlePayment('Credit Card')}>
              <Text style={styles.paymentButtonText}>Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowPaymentModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  promotions: {
    padding: 20,
    backgroundColor: '#f8d7da',
    marginBottom: 20,
    borderRadius: 10,
  },
  promotionText: {
    marginBottom: 10,
    color: '#721c24',
  },
  carouselContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  carouselImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  dashboard: {
    padding: 20,
    backgroundColor: '#f8d7da',
    marginBottom: 20,
    borderRadius: 10,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    backgroundColor: '#007bff',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    color: '#007bff',
  },
  searchIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#721c24',
  },
  itemPrice: {
    color: '#721c24',
  },
  cart: {
    padding: 20,
    backgroundColor: '#f8d7da',
    marginBottom: 20,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
  },
  paymentButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft : -130
  },
  loginText: {
    marginLeft: -130,
  },
});

export default App;
