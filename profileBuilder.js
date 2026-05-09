const developers = [
  {
    id: 1,
    name: "Amara Johnson",
    track: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    projects: { completed: 8, ongoing: 2 },
    isAvailable: true,
    mentor: { name: "Sarah Chen", specialty: "React" }
  },
  {
    id: 2,
    name: "Chidi Okafor",
    track: "Backend",
    skills: ["Python", "Django", "SQL"],
    projects: { completed: 5, ongoing: 3 },
    isAvailable: false,
    mentor: { name: "James Udo", specialty: "System Design" }
  },
  {
    id: 3,
    name: "Fatima Hassan",
    track: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "Vue", "TypeScript"],
    projects: { completed: 10, ongoing: 1 },
    isAvailable: true,
    mentor: null
  },
  {
    id: 4,
    name: "Emeka Nwosu",
    track: "Mobile",
    skills: ["Dart", "Flutter"],
    projects: { completed: 3, ongoing: 1 },
    isAvailable: true,
    mentor: { name: "Femi Adeyemi", specialty: "Mobile Architecture" }
  },
  {
    id: 5,
    name: "Zara Ahmed",
    track: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "GraphQL"],
    projects: { completed: 7, ongoing: 2 },
    isAvailable: true,
    mentor: null
  },
  {
    id: 6,
    name: "Grace Eze",
    track: "Frontend",
    skills: [],
    projects: { completed: 0, ongoing: 0 },
    isAvailable: false,
    mentor: { name: "Sarah Chen", specialty: "React" }
  }
];

// Step 1: Profile Cards
const buildProfileCard = ({ name, track, skills, projects, isAvailable, mentor }) => {
  const availability = isAvailable ? "Available" : "Not Available";
  const mentorName = mentor?.name ?? "No mentor assigned";
  const skillsList = skills.length > 0 ? skills.join(", ") : "No skills listed yet";

    return `    Name: ${name}
    Track: ${track}
    Skills: ${skillsList}
    Projects: ${projects.completed} completed, ${projects.ongoing} ongoing
    Availability: ${availability}
    Mentor: ${mentorName}
`;
};  
console.log("Developer Profiles:");
developers.map(dev => console.log(buildProfileCard(dev)));

//Step 2: Unique Skills Pool

const allSkills = developers.flatMap(({ skills }) => skills);
const uniqueSkills = [...new Set(allSkills)].sort();

console.log(`Unique Skills: ${uniqueSkills.join(", ")}`);

// Step 3: Track Summary
const uniqueTracks = [...new Set(developers.map(({ track }) => track))];
const trackSummary = uniqueTracks.map(track => {
  const trackDevs = developers.filter(dev => dev.track === track);
  const numAvailable = trackDevs.filter(({ isAvailable }) => isAvailable).length;
  const totalCompleted = trackDevs.reduce((sum, { projects }) => sum + projects.completed, 0);

   return `
    Track: ${track}
    Developers: ${trackDevs.length}
    Available Developers: ${numAvailable}
    Total Completed Projects: ${totalCompleted}
    `;
});

trackSummary.map((summary) => console.log(summary));


// Step 4: Add a New Developer
const addDeveloper = (developersArray, newDeveloper) => {
  return [...developersArray, newDeveloper];
};
const newDeveloper = {
  id: 7,
  name: "Tolu Adekunle",
  track: "DevOps",
  skills: ["Docker", "AWS", "Kubernetes"],
  projects: { completed: 4, ongoing: 1 },
  isAvailable: true,
  mentor: { name: "David Obi", specialty: "Cloud Engineering" }
};

const newDevelopersUpdated = addDeveloper(developers, newDeveloper);
console.log(`Original Developers Length: ${developers.length}`);
console.log(`New Developers Length: ${newDevelopersUpdated.length}`);

// Step 5: Update DeveloperStep 5: Update a Developer

const updateDeveloper = (developersArray, id, updates) => {
    return developersArray.map(developer => {
        return developer.id === id ? { ...developer, ...updates } : developer;
    });
};
const updatedDeveloper = updateDeveloper(developers, 4, {
    skills: [...developers[3].skills, "React Native"],
    isAvailable: false
});
const updatedEmeka = updatedDeveloper.find(dev => dev.id === 4);

console.log("Updated Developer:");
console.log(buildProfileCard(updatedEmeka));


// Step 6:Mentor Workload
const mentorWorkload = developers.reduce((workload, { mentor }) => {
    const mentorName = mentor?.name ?? "Unassigned";
    workload[mentorName] = (workload[mentorName] ?? 0) + 1;
    return workload;
}, {});

console.log("Mentor Workload:", mentorWorkload);    

// Step 7: Experience Ranking
const rankedDevelopers = [...developers]
  .sort(
    ( { projects: A},{ projects: B }) =>
      (B.completed + B.ongoing) - (A.completed + A.ongoing)
  )
  .map(
    (
      { name, track, projects: { completed, ongoing } },
      index
    ) => {
    const totalProjects = completed + ongoing;

      const medal =
        index === 0
          ? "🥇"
          : index === 1
          ? "🥈"
          : index === 2
          ? "🥉"
          : "";
      return `${medal} Rank ${index + 1}: ${name} - ${totalProjects} total projects`;
    }
  );

console.log("Experience Ranking:");
rankedDevelopers.map(rank => console.log(rank));