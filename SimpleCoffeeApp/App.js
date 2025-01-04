import React, { useState, setQuantity } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, handleDecreaseQuantity, handleIncreaseQuantity, quantity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [selectedSize, setSelectedSize] = useState(null); // Seçilen boyutu tutuyor

  // Ekranlar
  function Card1({ navigation }) {

    const [quantity, setQuantity] = useState(1); // Varsayılan miktar 1
    const [selectedSize, setSelectedSize] = useState(null); // Seçilen boyutu tutuyor

     // **Fonksiyonlar:**
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1); // Miktarı 1 artırır
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1); // Miktarı 1 azaltır (1'in altına düşmez)
    }
  };

    return (
      <View style={styles.screen}>
        {/* Geri dönüş butonu */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Başlık */}
        <Text style={styles.title}>Classic Cappucino</Text>

        {/* Resim */}
        <Image
          style={styles.image}
          source={{ uri: 'https://i.imgur.com/Nevdk0u.jpg' }} // Replace with your image URL
        />

        {/* Kahve çekirdeği, Su damlası ve Cappucino ikonları */}
        <View style={styles.iconsRow}>
          {/* İlk kutucuk */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle1}>
              <FontAwesome name="tint" size={24} color="white" />
            </View>
            <Text style={styles.iconText1}>Milk</Text>
          </View>

          {/* İkinci kutucuk */}
          <View style={[styles.iconContainer, styles.secondIconContainer]}>
            <View style={styles.iconCircle2}>
              <FontAwesome name="coffee" size={24} color="white" />
            </View>
            <Text style={styles.iconText2}>Coffee</Text>
          </View>

          {/* Üçüncü kutucuk (Cappuccino) */}
          <View style={[styles.iconContainer, styles.thirdIconContainer]}>
            <View style={styles.iconCircle3}>
              <FontAwesome name="fire" size={24} color="white" />
            </View>
            <Text style={styles.iconText3}>Cappuccino</Text>
          </View>
        </View>

        {/* Kalp sembolü */}
        <TouchableOpacity style={styles.heartButton}>
          <FontAwesome name="heart" size={24} color="red" />
        </TouchableOpacity>

        {/* Size Seçenekleri */}
        <Text style={styles.sizeTitle}>Size</Text>
        <View style={styles.sizeContainer}>
          {/* Boyut Seçeneklerini büyük bir kutu içine alıyoruz */}
          <View style={[
            styles.sizeWrapper,
            selectedSize && { backgroundColor: '#d3d3d3' }, // Seçilen boyut kutusunun rengi gri olacak
          ]}>
            {['Small', 'Medium', 'Large'].map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeOption,
                  selectedSize === size && styles.selectedOption, // Seçilen boyutu vurgulamak için stil ekliyoruz
                ]}
                onPress={() => handleSizeSelection(size)}
              >
                <Text style={styles.sizeText}>{size}</Text>
                <FontAwesome name="coffee" size={24} color="black" style={styles.coffeeIcon} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

             {/* Quantity Seçenekleri */}
      <Text style={styles.quantityTitle}>Quantity</Text>
      <View style={styles.quantityContainer}>
        {/* Azaltma butonu */}
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleDecreaseQuantity}
        >
          <FontAwesome name="minus" size={24} color="black" />
        </TouchableOpacity>

        {/* Miktar */}
        <Text style={styles.quantityText}>{quantity}</Text>

        {/* Artırma butonu */}
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleIncreaseQuantity}
        >
          <FontAwesome name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

           {/* Description Başlık ve Açıklama */}
           <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.descriptionText}>
        Classic Cappuccino is a delightful combination of rich espresso and steamed milk,
        topped with a frothy milk foam. Perfect for a cozy morning or an afternoon pick-me-up.
      </Text>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to cart</Text>
        <Text style={styles.addToCartSeparator}>|</Text>
        <Text style={styles.addToCartPrice}>$3.45</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Stack Navigator
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Header'ı tamamen kaldırıyoruz
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Card1" component={Card1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: 40,
  },
  image: {
    width: '80%',
    height: 300,
    resizeMode: 'cover',
    marginVertical: 20,
    top: 20, // Eski yerine geri döndü
  },
  iconsRow: {
    flexDirection: 'row', // İkonları yatayda hizalamak için
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 160, // Eski yerine geri döndü
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 10, // Kutucuklar arasında boşluk
  },
  secondIconContainer: {
    marginLeft: 20, // İlk kutucuğun biraz yanına yerleştirmek için
  },
  thirdIconContainer: {
    marginLeft: 20, // Üçüncü kutucuk ilk kutucuğun sağında olacak şekilde
  },
  iconCircle1: {
    width: 60,
    height: 60,
    backgroundColor: 'orange',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // İkonun altındaki başlık için boşluk
    top: 50,
    right: 20,
  },
  iconCircle2: {
    width: 60,
    height: 60,
    backgroundColor: 'orange',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // İkonun altındaki başlık için boşluk
    top: 110,
  },
  iconCircle3: {
    width: 60,
    height: 60,
    backgroundColor: 'orange',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // İkonun altındaki başlık için boşluk
    top: 50,
    left: 20,
  },
  iconText1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    top: 50,
    right: 20,
  },
  iconText2: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    top: 110,
  },
  iconText3: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    top: 50,
    left: 20,
  },
  heartButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  sizeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    right: 150,
    bottom: 70,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    bottom: 80,
  },
  sizeWrapper: {
    width: '100%',
    backgroundColor: '#d3d3d3', // Gri renk arkaplan
    borderRadius: 30, // Yuvarlak köşeler
    flexDirection: 'row',
    justifyContent: 'space-between', // Küçük kutucukları yerleştirme
  },
  sizeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    backgroundColor: '#d3d3d3', // Gri renk arkaplan
    borderRadius: 30, // Yuvarlak kenar
    borderWidth: 2,
    borderColor: 'transparent', // Başlangıçta kenar rengi yok
  },
  selectedOption: {
    borderColor: 'black', // Seçilen kutunun kenarının siyah olması
  },
  sizeText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
  coffeeIcon: {
    marginLeft: 10,
  },
  quantityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    right: 135,
    bottom: 50,
  },
  quantityContainer: {
    flexDirection: 'row', // Elemanları yatayda hizalar
    alignItems: 'center', // Elemanları dikeyde ortalar
    justifyContent: 'center', // Elemanları yatayda ortalar
    backgroundColor: 'none', // Şeffaf bırakıldı
    borderRadius: 30,
    borderColor: "#d3d3d3",
    borderWidth: 2,
    width: "30%", // Kutunun genişliğini ayarladım
    height: 50,
    bottom: 105,
    right: 20,
  },
  quantityButton: {
    padding: 10,
    backgroundColor: 'none', // Şeffaf bırakıldı
    borderRadius: 5,
    width: "40%",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Metni ortaladı
    width: 30, // Sabit bir genişlik verdim (hizalama için)
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    right: 120,
    bottom: 80, // Başlık miktarın hemen altında
  },
  descriptionText: {
    fontSize: 14, // Daha ince bir yazı boyutu
    fontStyle: 'italic', // Paragrafı ince bir stile getirmek için
    color: '#555', // Daha soluk bir renk
    lineHeight: 20, // Paragraflar için satır yüksekliği
    textAlign: 'justify', // Metni her iki tarafa yaslamak için
    bottom: 75, // Quantity'nin altına uygun hizalamak için
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2C1F0E', // Siyah-kahverengi renk
    borderRadius: 30,
    padding: 15,
    width: '90%', // Genişlik ekranın %90'ı kadar
    position: 'absolute',
    bottom: 20, // Ekranın en altına yakın
  },
  addToCartText: {
    fontSize: 16,           // Orta büyüklükte, okunabilir yazı
    color: '#FFFFFF',       // Beyaz renk (buton koyu renk arka planlı)
    textAlign: 'center',   // Ortalanmış metin
    fontWeight: '600',     // Yarı kalın bir görünüm
    marginLeft: 10,
  },
  addToCartSeparator: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addToCartPrice: {
    marginRight: 10,
    fontSize: 16,       // Orta büyüklükte, okunabilir yazı
    color: '#FFFFFF',   // Beyaz renk (buton koyu renk arka planlı)
    fontWeight: '600',  // Yarı kalın bir görünüm
  },
});
