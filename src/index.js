import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

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

  const handleAddProject = async () => {
    try {
      const response = await api.post("projects", {
        title: `Novo projecto: ${Date.now()}`,
        owner: `Luisito`,
      });

      const newProject = response.data;

      setProjects([...projects, newProject]);
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.projectTitle}>{project.title}</Text>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159C1",
  },

  projectTitle: {
    color: "#fff",
    fontSize: 30,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",

    margin: 20,
    height: 50,
    borderRadius: 4,
    backgroundColor: "#fff",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#7159c1",
  },
});

export default App;
