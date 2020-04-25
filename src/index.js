import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, StatusBar } from "react-native";

import api from "./services/api";

const App = () => {
  const demoProjects = [
    { title: "Toaster", id: "1" },
    { title: "Wikipedia", id: "2" },
    { title: "Music Synthesizer", id: "3" },
    { title: "Football Neural-Network", id: "4" },
    { title: "Apple II emulator", id: "5" },
  ];

  const [projects, setProjects] = useState(demoProjects);

  const getProjects = async () => {
    try {
      const response = await api.get("projects");

      setProjects(response.data);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <View style={styles.conatiner}>
        <Text style={styles.title}>Sup Guys!</Text>

        {projects.length > 0 &&
          projects.map((project) => (
            <Text style={styles.projectTitle} key={project.id}>
              {project.title}
            </Text>
          ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#7159C1",
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  projectTitle: {
    color: "#fff",
    fontSize: 15,
  },
});

export default App;
