import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, FlatList, Text, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showFullList, setShowFullList] = useState(false);
  const [showSlider, setShowSlider] = useState(true);
  const [selectedSliderIndex, setSelectedSliderIndex] = useState(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const data = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grapes",
    "Honeydew",
  ];

  const sliderData = [
    {
      title: "Cappuccino",
      image: "https://i.imgur.com/Nevdk0u.jpg",
      cards: [
        { title: "Classic Cappuccino", image: "https://i.imgur.com/Nevdk0u.jpg", price: "$3.75", description: "Eşit miktarda espresso, buharda pişirilmiş süt ve köpükten oluşan, zamansız ve dengeli orijinal." },
        { title: "Dry Cappuccino", image: "https://i.imgur.com/8tXgADo.jpg", price: "$4.00", description: "Daha kalın köpük tabakasına sahip, daha hafif bir kahve tadı sunan bir çeşididir." },
        { title: "Wet Cappuccino", image: "https://i.imgur.com/fBvnKuE.jpg", price: "$4.50", description: "Daha fazla buharlanmış süt ve daha az köpük, daha kremsi ve yumuşak bir tat yaratır." },
        { title: "Flavored Cappuccino", image: "https://i.imgur.com/yiMWIya.jpg", price: "$4.25", description: "Ekstra tat için vanilya, karamel veya fındık gibi şuruplarla tatlandırılır." },
        { title: "Chocolate Cappuccino", image: "https://i.imgur.com/nUvwFUp.jpg", price: "$4.75", description: "Çikolata şurubu veya kakao tozu ile nefis bir karışım." },
      ],
    },
    {
      title: "Latte",
      image: "https://i.imgur.com/1z5g5gD.jpg",
      cards: [
        { title: "Vanilla Latte", image: "https://i.imgur.com/s2OkZWQ.jpg", price: "$4.00", description: "Vanilya, latteler için klasik ve sevilen bir aromadır; tatlı ama hafif tadı kahveyle mükemmel bir uyum sağlar." },
        { title: "Hazelnut Latte", image: "https://i.imgur.com/xMZSgMq.jpg", price: "$4.50", description: "Sağlık yararları ve nefis lezzetiyle fındık sütü, latteler için hızla tercih edilen bitki bazlı tercih haline geldi." },
        { title: "Caramel Latte", image: "https://i.imgur.com/UEJILhZ.jpg", price: "$4.25", description: "Karamel latte, espressoyu karamel şurubu ile birleştiren lezzetli bir içecektir." },
        { title: "Mocha Latte", image: "https://i.imgur.com/D1IOglt.jpg", price: "$4.75", description: "Bu içecek çikolata severler için birebir: Espresso, süt ve çikolata sosu veya şurubunun birleşiminden oluşuyor." },
        { title: "Pumpkin Spice Latte", image: "https://i.imgur.com/EG8PANv.jpg", price: "$4.99", description: "İçerisinde tarçın, muskat, karanfil ve balkabağı püresi bulunmaktadır." },
      ],
    },
    {
      title: "Espresso",
      image: "https://i.imgur.com/2z5g5gD.jpg",
      cards: [
        { title: "Single Espresso", image: "https://i.imgur.com/5lsWQNh.jpg", price: "$2.50", description: "Bir kadeh zengin ve koyu espresso." },
        { title: "Double Espresso", image: "https://i.imgur.com/cls6xVr.jpg", price: "$3.00", description: "Daha güçlü bir tat için iki kadeh espresso." },
        { title: "Espresso Macchiato", image: "https://i.imgur.com/t8zQgSK.jpg", price: "$2.75", description: "Espresso üzerine bir parça köpük." },
        { title: "Espresso Con Panna", image: "https://i.imgur.com/iVFk7yV.jpg", price: "$3.25", description: "Espresso üzerine çırpılmış krema." },
        { title: "Affogato", image: "https://i.imgur.com/lWbFELA.jpg", price: "$4.50", description: "Bir top vanilyalı dondurma üzerine espresso." },
      ],
    },
    {
      title: "Mocha",
      image: "https://i.imgur.com/3z5g5gD.jpg",
      cards: [
        { title: "Classic Mocha", image: "https://i.imgur.com/B4pRqeP.jpg", price: "$4.00", description: "Buharda pişirilmiş süt ve çikolata ile yapılan zengin bir mocha." },
        { title: "White Mocha", image: "https://i.imgur.com/h0Z92M2.jpg", price: "$4.50", description: "Beyaz çikolata ile yapılmış tatlı bir mocha." },
        { title: "Caramel Mocha", image: "https://i.imgur.com/Md80966.jpg", price: "$4.75", description: "Karamel ve mocha'nın enfes birleşimi." },
        { title: "Mocha Frappuccino", image: "https://i.imgur.com/IVADA6w.jpg", price: "$5.00", description: "Çırpılmış krema ile harmanlanmış mocha." },
        { title: "Mint Mocha", image: "https://i.imgur.com/r4FGiKv.jpg", price: "$4.25", description: "Nane aromalı bir mocha." },
      ],
    },
    {
      title: "Americano",
      image: "https://i.imgur.com/4z5g5gD.jpg",
      cards: [
        { title: "Classic Americano", image: "https://i.imgur.com/cYlG0X8.jpg", price: "$2.50", description: "Sıcak su ve espresso ile yapılan basit bir americano." },
        { title: "Double Americano", image: "https://i.imgur.com/Ng1YFRQ.jpg", price: "$3.00", description: "Eklenen sıcak suya ilave olarak süt eklenmesi veya sadece süt eklenmesi şeklinde seyreltilen americano." },
        { title: "Americano with Milk", image: "https://i.imgur.com/pUBEglm.jpg", price: "$3.25", description: "Biraz sütlü bir americano." },
        { title: "Americano with Flavor", image: "https://i.imgur.com/6KLkqAc.jpg", price: "$3.50", description: "Aroma şurubu eklenmiş bir americano." },
        { title: "Americano with Cream", image: "https://i.imgur.com/Iru82fP.jpg", price: "$3.75", description: "Üstü kremalı bir americano." },
      ],
    },
    {
      title: "Iced Coffees",
      image: "https://i.imgur.com/4z5g5gD.jpg",
      cards: [
        { title: "Iced Cappucino", image: "https://i.imgur.com/MpLVB06.jpg", price: "$4.00", description: "Sadece soğuk cappucino." },
        { title: "Iced Latte", image: "https://i.imgur.com/vZX3pzb.jpg", price: "$4.50", description: "Sadece soğuk latte." },
        { title: "Iced Espresso", image: "https://i.imgur.com/z5DFuI2.jpg", price: "$3.00", description: "Sadece soğuk espresso." },
        { title: "Iced Mocha", image: "https://i.imgur.com/UcxGpdO.jpg", price: "$4.75", description: "Sadece soğuk mocha." },
        { title: "Iced Americano", image: "https://i.imgur.com/8Uc8moy.jpg", price: "$3.50", description: "Sadece soğuk americano." },
      ],
    },
  ];


  const handleSearch = (text) =>
  {
    setSearchQuery(text);

    if (text)
    {
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }

    else
    {
      setFilteredData([]);
    }

    setShowFullList(false);
  };

  const handleListPress = () =>
  {
    setShowFullList(!showFullList);
    setShowSlider(!showSlider);

    if (!showFullList)
    {
      setFilteredData(data);
      setSearchQuery("");
    }

    else
    {
      setFilteredData([]);
    }
  };

  const handleFilterPress = () =>
  {
    alert("Filter button pressed!");
  };

  const handleCartPress = () =>
  {
    alert("Cart button pressed!");
  };

  const handleSliderItemPress = (index) =>
  {
    setSelectedSliderIndex(index);
  };

  const handleAddButtonPress = (card) => {
    navigation.navigate("Card1", {
      title: card.title,
      image: card.image,
      price: card.price,
      description: card.description,
    });
  };

  const handleViewAllPress = () => 
  {
    alert("View All pressed!");
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "android" ? "padding" : "height"}>

      {/* Başlık Bölümü (Header Section) */}
      {!isKeyboardVisible && (
      <View style={styles.header}>
        <TouchableOpacity style={styles.listButton} onPress={handleListPress}>
          <Icon name="list" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
          <Icon name="shopping-cart" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      )}

      {/* Arama Butonu Bölümü (Search Bar Section) */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Arama..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Filtre Butonu Bölümü (Filter Box Section) */}
      {!isKeyboardVisible && (
      <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
        <Icon name="sliders" size={18} color="#fff" />
      </TouchableOpacity>
      )}

      {/* Kaydırıcı Bölümü (Slider (Horizontal ScrollView) Section) */}
      {searchQuery === "" && showSlider && !isKeyboardVisible && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sliderContainer}>

          {/* Önerilenler Kutucuğu (Recommendeds Box) */}
          <TouchableOpacity
            style={[styles.recommendedItem, selectedSliderIndex === null ? styles.selectedRecommendedItem : styles.defaultRecommendedItem]}
            onPress={() => setSelectedSliderIndex(null)}
          >
            <Text style={[styles.recommendedText, selectedSliderIndex === null ? styles.selectedRecommendedText : styles.defaultRecommendedText]}>
              Önerilenler 👍
            </Text>
          </TouchableOpacity>

          {/* Diğer Kaydırıcı Kutuları (Other Slider Boxes) */}
          {sliderData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.sliderItem, selectedSliderIndex === index && styles.selectedSliderItem]}
              onPress={() => handleSliderItemPress(index)}
            >
              <Text style={[styles.sliderText, selectedSliderIndex === index && styles.selectedSliderText]}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Kahve Kartları Bölümü (Coffee Slider Section) */}
      {searchQuery === "" && showSlider && selectedSliderIndex === null && !isKeyboardVisible && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardSlider}>
          <View style={styles.card}>
            <Image
              source={{ uri: "https://i.imgur.com/8tXgADo.jpg" }}
              style={styles.image}
            />
            <Text style={styles.title}>Dry Cappuccino</Text>
            <Text style={styles.description}>
              Daha kalın köpük tabakasına sahip, daha hafif bir kahve tadı sunan bir çeşididir.
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.price}>$4.99</Text>
              <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
                <Icon name="plus" size={20} color="#fff"/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Image
              source={{ uri: "https://i.imgur.com/EG8PANv.jpg" }}
              style={styles.image}
            />
            <Text style={styles.title}>Pumpkin Spice Latte</Text>
            <Text style={styles.description}>
              İçerisinde tarçın, muskat, karanfil ve balkabağı püresi bulunmaktadır.
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.price}>$4.99</Text>
              <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
                <Icon name="plus" size={20} color="#fff"/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Image
              source={{ uri: "https://i.imgur.com/lWbFELA.jpg" }}
              style={styles.image}
            />
            <Text style={styles.title}>Affogato</Text>
            <Text style={styles.description}>
              Bir top vanilyalı dondurma üzerine espresso.
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.price}>$4.99</Text>
              <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
                <Icon name="plus" size={20} color="#fff"/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Image
              source={{ uri: "https://i.imgur.com/IVADA6w.jpg" }}
              style={styles.image}
            />
            <Text style={styles.title}>Mocha Frappucino</Text>
            <Text style={styles.description}>
              Çırpılmış krema ile harmanlanmış mocha.
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.price}>$4.99</Text>
              <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
                <Icon name="plus" size={20} color="#fff"/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Image
              source={{ uri: "https://i.imgur.com/8Uc8moy.jpg" }}
              style={styles.image}
            />
            <Text style={styles.title}>Iced Americano</Text>
            <Text style={styles.description}>
              Sadece soğuk americano.
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.price}>$4.99</Text>
              <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
                <Icon name="plus" size={20} color="#fff"/>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Seçilen Slider Elemanına Göre Kartlar */}
      {searchQuery === "" && showSlider && selectedSliderIndex !== null && !isKeyboardVisible && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardSlider}>
          {sliderData[selectedSliderIndex].cards.map((card, cardIndex) => (
            <View key={cardIndex} style={styles.card}>
              <Image
                source={{ uri: card.image }}
                style={styles.image}
              />
              <Text style={styles.title}>{card.title}</Text>
              <Text style={styles.description}>
                {card.description}
              </Text>
              <View style={styles.cardFooter}>
                <Text style={styles.price}>{card.price}</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
                  <Icon name="plus" size={20} color="#fff"/>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Popüler Kahveler Bölümü (Popular Coffees Section) */}
      {searchQuery === "" && showSlider && !isKeyboardVisible && (
        <View style={styles.popularSection}>
          <Text style={styles.popularText}>
            Popular Coffees <Icon name="fire" size={20} color="orange" />
          </Text>
          <TouchableOpacity onPress={handleViewAllPress} style={styles.viewAllButton}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Dikdörtgen Kahve Kartları Bölümü (Rectangle Coffee Cards Section) */}
      {searchQuery === "" && showSlider && !isKeyboardVisible && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rectangularCardSlider}>
          <View style={styles.rectangularCard}>
            <Image
              source={{ uri: "https://i.imgur.com/yiMWIya.jpg" }}
              style={styles.rectangularImage}
            />
            <View style={styles.rectangularTextContainer}>
              <Text style={styles.rectangularTitle}>Flavored Cappuccino</Text>
              <Text style={styles.rectangularDescription}>
                Ekstra tat için vanilya, karamel veya fındık gibi şuruplarla tatlandırılır.
              </Text>
            </View>
          </View>

          <View style={styles.rectangularCard}>
            <Image
              source={{ uri: "https://i.imgur.com/D1IOglt.jpg" }}
              style={styles.rectangularImage}
            />
            <View style={styles.rectangularTextContainer}>
              <Text style={styles.rectangularTitle}>Mocha Latte</Text>
              <Text style={styles.rectangularDescription}>
                Bu içecek çikolata severler için birebir: Espresso, süt ve çikolata sosu veya şurubunun birleşiminden oluşuyor.
              </Text>
            </View>
          </View>

          <View style={styles.rectangularCard}>
            <Image
              source={{ uri: "https://i.imgur.com/t8zQgSK.jpg" }}
              style={styles.rectangularImage}
            />
            <View style={styles.rectangularTextContainer}>
              <Text style={styles.rectangularTitle}>Espresso Macchiato</Text>
              <Text style={styles.rectangularDescription}>
                Espresso üzerine bir parça köpük.
              </Text>
            </View>
          </View>

          <View style={styles.rectangularCard}>
            <Image
              source={{ uri: "https://i.imgur.com/Md80966.jpg" }}
              style={styles.rectangularImage}
            />
            <View style={styles.rectangularTextContainer}>
              <Text style={styles.rectangularTitle}>Caramel Mocha</Text>
              <Text style={styles.rectangularDescription}>
                Karamel ve mocha'nın enfes birleşimi.
              </Text>
            </View>
          </View>

          <View style={styles.rectangularCard}>
            <Image
              source={{ uri: "https://i.imgur.com/Ng1YFRQ.jpg" }}
              style={styles.rectangularImage}
            />
            <View style={styles.rectangularTextContainer}>
              <Text style={styles.rectangularTitle}>Double Americano</Text>
              <Text style={styles.rectangularDescription}>
                Eklenen sıcak suya ilave olarak süt eklenmesi veya sadece süt eklenmesi şeklinde seyreltilen americano.
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Sonuçlar Listesi (Results List) */}
      {searchQuery.length > 0 || showFullList ? (
        <FlatList
          data={showFullList ? data : filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      ) : null}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
  listButton: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 40,
    top: 20,
  },
  cartButton: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 40,
    top: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 40,
    paddingHorizontal: 10,
    shadowColor: "rgb(255, 149, 0)",
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 10,
    width: 290,
    top: 20,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    top: 130,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  sliderContainer: {
    marginTop: 40,
    flexDirection: "row",
    position: "relative",
    zIndex: 1,
  },
  recommendedItem: {
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 140,
    height: 40,
  },
  selectedRecommendedItem: {
    backgroundColor: "orange",
  },
  defaultRecommendedItem: {
    backgroundColor: "#fff",
    shadowColor: "rgb(255, 149, 0)",
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  recommendedText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  selectedRecommendedText: {
    color: "#fff",
  },
  defaultRecommendedText: {
    color: "#333",
  },
  sliderItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    shadowColor: "rgb(255, 149, 0)",
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedSliderItem: {
    backgroundColor: "orange",
  },
  sliderText: {
    fontSize: 14,
    color: "#333",
  },
  selectedSliderText: {
    color: "#fff",
  },
  cardSlider: {
    position: "absolute",
    top: 300,
    left: 20,
    width: "100%",
    height: "32%",
    zIndex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowColor: "rgb(255, 149, 0)",
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    padding: 15,
    alignItems: "center",
    width: 180,
    height: 250,
    marginRight: 15,
    marginBottom: 200,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 39.9,
    marginBottom: 10,
    shadowColor: "#F28B63",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 7,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    width: "100%",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "orange",
  },
  addButton: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    width: 35,
    height: 37.5,
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginTop: 20,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  popularSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  popularText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    top: 300,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "bold",
    color: "orange",
    top: 300,
    zIndex: 2,
    padding: 10,
  },
  viewAllButton: {
    zIndex: 2,
  },
  rectangularCardSlider: {
    marginTop: 300,
    marginBottom: 20,
    zIndex: 1,
  },
  rectangularCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "rgb(255, 149, 0)",
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: "row",
    padding: 15,
    marginRight: 15,
    width: 300,
    height: 150,
  },
  rectangularImage: {
    width: 80,
    height: 80,
    borderRadius: 39.9,
    marginRight: 15,
    shadowColor: "#F28B63",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  rectangularTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rectangularTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  rectangularDescription: {
    fontSize:  12,
    fontStyle: "italic",
    color: "#666",
  },
});

export default HomeScreen;