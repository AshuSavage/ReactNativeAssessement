import { StatusBar } from "expo-status-bar";
 import React, { useEffect, useState } from "react";
 import {
   FlatList,
   Image,
   SafeAreaView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
 } from "react-native";
 import { Ionicons } from "@expo/vector-icons";
 import { useNavigation } from "expo-router";
 // Sample data for stories (static, since the API is for the feed)
 const stories = [
   { id: "1", name: "User 1", image: "https://via.placeholder.com/150" },
   { id: "2", name: "User 2", image: "https://via.placeholder.com/150" },
   { id: "3", name: "User 3", image: "https://via.placeholder.com/150" },
   { id: "4", name: "User 4", image: "https://via.placeholder.com/150" },
   { id: "5", name: "User 5", image: "https://via.placeholder.com/150" },
 ];
 export default function App() {
   const navigation = useNavigation();
   // State to store the posts fetched from the API
   navigation.setOptions{{}}
   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   // Fetch data from the API when the component mounts
   useEffect(() => {
     const fetchPosts = async () => {
       try {
         const response = await fetch(
           "https://social.circuitchat.io/api/feed?profile=67c14a5cc3ca32727761ca6f&lastId=&limit=15",
           {
             method: "GET",
             headers: {
               Cookie:
                 "session=s%3A8tq6BbGo7I5htwLfGzEP1mKtI7wI8Q73.0sdlCnMjLKza9A9v34qMeQ8ucNjr4J34yM7ecsR6fAk; session=s%3AR4_vuXeIdyLLty0v2Z58n4C5oJFX4Odx.zFAkgzG4Nftwkn3QOq3dUR9NOoPT5DwxzdkdT3Hfx0k",
               "client-id": "66ea7609c990886923861202",
               "client-secret": "653f1e94-fa6d-4d10-932e-e1030c5dcb1c",
             },
           }
         );
         if (!response.ok) {
           throw new Error("Failed to fetch posts");
         }
         const data = await response.json();
         // Map the API response to the expected post format
         const formattedPosts = data.feeds.map((feed) => ({
           id: feed._id,
           user: feed.user.name,
           userProfilePic: feed.user.avatar,
           createdAt: new Date(feed.createdAt).toLocaleString(),
           text: feed.text || "",
           image:
             feed.files.length > 0 && feed.files[0].type.startsWith("image")
               ? feed.files[0].url
               : null, // Only use the first image
           likes: feed.reactions.length || "0",
           shares: feed.share || "0",
         }));
         setPosts(formattedPosts);
         setLoading(false);
       } catch (err) {
         setError(err.message);
         setLoading(false);
       }
     };
     fetchPosts();
   }, []);
   // Render each story item
   const renderStory = ({ item }) => (
     <View style={styles.storyContainer}>
       <Image source={{ uri: item.image }} style={styles.storyImage} />
       {item.id === "3" || item.id === "4" ? (
         <View style={styles.newBadge}>
           <Text style={styles.newBadgeText}>NEW</Text>
         </View>
       ) : null}
     </View>
   );
   // Render each post item
   const renderPost = ({ item }) => (
     <View style={styles.postContainer}>
       <View style={styles.postHeader}>
         <Image
           source={{ uri: item.userProfilePic }}
           style={styles.profileImage}
         />
         <View>
           <Text style={styles.userName}>{item.user}</Text>
           <Text style={styles.time}>{item.createdAt}</Text>
         </View>
       </View>
       {item.text && <Text style={styles.postText}>{item.text}</Text>}
       {item.image && (
         <Image source={{ uri: item.image }} style={styles.postImage} />
       )}
       <View style={styles.postFooter}>
         <View style={styles.interaction}>
           <Ionicons name="heart" size={24} color="red" />
           <Text style={styles.interactionText}>{item.likes}</Text>
         </View>
         <View style={styles.interaction}>
           <Ionicons name="share-outline" size={24} color="black" />
           <Text style={styles.interactionText}>{item.shares} Shares</Text>
         </View>
       </View>
     </View>
   );
   if (loading) {
     return (
       <SafeAreaView style={styles.container}>
         <Text style={styles.loadingText}>Loading...</Text>
       </SafeAreaView>
     );
   }
   if (error) {
     return (
       <SafeAreaView style={styles.container}>
         <Text style={styles.errorText}>Error: {error}</Text>
       </SafeAreaView>
     );
   }
   return (
     <SafeAreaView style={styles.container}>
       <StatusBar style="auto" />
       {/* Header */}
       <View style={styles.header}>
         <Ionicons name="chevron-back" size={30} color="black" />
         <View style={styles.headerTitleContainer}>
           <Text style={styles.headerTitle}>Ankita</Text>
           <Ionicons name="chevron-down" size={20} color="black" />
         </View>
         <View style={styles.headerIcons}>
           <Ionicons name="camera-outline" size={30} color="black" />
           <Ionicons name="search" size={30} color="black" />
           <Ionicons name="ellipsis-vertical" size={30} color="black" />
         </View>
       </View>
       {/* Stories Section */}
       <FlatList
         horizontal
         data={stories}
         renderItem={renderStory}
         keyExtractor={(item) => item.id}
         showsHorizontalScrollIndicator={false}
         style={styles.storiesList}
       />
       {/* Hashtags */}
       <View style={styles.hashtags}>
         <Text style={styles.hashtagText}>#Food #Travel #Shopping #Science</Text>
       </View>
       {/* Posts Section */}
       <FlatList
         data={posts}
         renderItem={renderPost}
         keyExtractor={(item) => item.id}
         style={styles.postsList}
       />
       {/* Bottom Navigation */}
       <View style={styles.bottomNav}>
         <TouchableOpacity style={styles.navItem}>
           <Ionicons name="flame" size={30} color="#FF69B4" />
           <Text style={styles.navTextActive}>Feed</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.navItem}>
           <Ionicons name="people" size={30} color="gray" />
           <Text style={styles.navText}>Friends</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.navItem}>
           <Ionicons name="chatbubble" size={30} color="gray" />
           <Text style={styles.navText}>Chats</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.navItem}>
           <Ionicons name="settings" size={30} color="gray" />
           <Text style={styles.navText}>Settings</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.navItem}>
           <Ionicons name="person" size={30} color="gray" />
           <Text style={styles.navText}>Profile</Text>
         </TouchableOpacity>
       </View>
     </SafeAreaView>
   );
 }
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#fff",
   },
   header: {
     flexDirection: "row",
     alignItems: "center",
     justifyContent: "space-between",
     padding: 10,
   },
   headerTitleContainer: {
     flexDirection: "row",
     alignItems: "center",
   },
   headerTitle: {
     fontSize: 20,
     fontWeight: "bold",
   },
   headerIcons: {
     flexDirection: "row",
     gap: 10,
   },
   storiesList: {
     paddingVertical: 10,
   },
   storyContainer: {
     marginHorizontal: 5,
     alignItems: "center",
   },
   storyImage: {
     width: 60,
     height: 60,
     borderRadius: 30,
     borderWidth: 2,
     borderColor: "#FF69B4",
   },
   newBadge: {
     position: "absolute",
     top: 0,
     right: 0,
     backgroundColor: "#FF69B4",
     borderRadius: 10,
     paddingHorizontal: 5,
   },
   newBadgeText: {
     color: "#fff",
     fontSize: 10,
   },
   hashtags: {
     padding: 10,
   },
   hashtagText: {
     color: "#FF69B4",
     fontSize: 16,
   },
   postsList: {
     flex: 1,
   },
   postContainer: {
     marginBottom: 20,
     paddingHorizontal: 10,
   },
   postHeader: {
     flexDirection: "row",
     alignItems: "center",
     marginBottom: 10,
   },
   profileImage: {
     width: 40,
     height: 40,
     borderRadius: 20,
     marginRight: 10,
   },
   userName: {
     fontWeight: "bold",
     fontSize: 16,
   },
   time: {
     color: "gray",
     fontSize: 12,
   },
   postText: {
     fontSize: 16,
     marginVertical: 10,
   },
   postImage: {
     width: "100%",
     height: 200,
     borderRadius: 10,
   },
   postFooter: {
     flexDirection: "row",
     justifyContent: "space-between",
     marginTop: 10,
   },
   interaction: {
     flexDirection: "row",
     alignItems: "center",
     gap: 5,
   },
   interactionText: {
     fontSize: 14,
   },
   bottomNav: {
     flexDirection: "row",
     justifyContent: "space-around",
     paddingVertical: 10,
     borderTopWidth: 1,
     borderTopColor: "#ddd",
   },
   navItem: {
     alignItems: "center",
   },
   navText: {
     fontSize: 12,
     color: "gray",
   },
   navTextActive: {
     fontSize: 12,
     color: "#FF69B4",
   },
   loadingText: {
     flex: 1,
     textAlign: "center",
     marginTop: 50,
     fontSize: 18,
   },
   errorText: {
     flex: 1,
     textAlign: "center",
     marginTop: 50,
     fontSize: 18,
     color: "red",
   },
 });




















