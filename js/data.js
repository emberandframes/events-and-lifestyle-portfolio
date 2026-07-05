/* =====================================================================
   Ember & Frames — content/data layer
   --------------------------------------------------------------------
   All gallery content lives here so markup stays presentational and
   new work can be added without touching HTML/CSS/JS logic.
   Image/video `src` values are URL-encoded and resolve as-is.
   ===================================================================== */
window.EMBER_DATA = {
  contact: {
    email: "emberandframes@gmail.com",
    phoneDisplay: "+91 84474 02780",
    phoneTel: "+918447402780",
    whatsapp: "918447402780",
    studio: "Hyderabad, India"
  },

  /* The wall — 8 curated frames, alternating subjects so no two
     similar images sit next to each other. */
  wall: [
    { src: "Photos/Arthi%20Sonthalia/DSC02835.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" },
    { src: "Photos/Festival%20of%20Play/DSC00744.JPG", name: "Festival of Play", year: "", ratio: "1/1" },
    { src: "Photos/Arthi%20Sonthalia/DSC02801.jpg", name: "Arti Sonthalia", year: "", ratio: "3/4" },
    { src: "Photos/Festival%20of%20Play/DSC00510.JPG", name: "Festival of Play", year: "", ratio: "5/4" },
    { src: "Photos/Arthi%20Sonthalia/DSC02817.jpg", name: "Arti Sonthalia", year: "", ratio: "1/1" },
    { src: "Photos/Festival%20of%20Play/DSC00922.JPG", name: "Festival of Play", year: "", ratio: "4/5" },
    { src: "Photos/Arthi%20Sonthalia/DSC02788.jpg", name: "Arti Sonthalia", year: "", ratio: "3/4" },
    { src: "Photos/Festival%20of%20Play/DSC00342.JPG", name: "Festival of Play", year: "", ratio: "1/1" }
  ],

  /* Event collections — rendered in order. */
  events: [
    {
      id: "arthi-sonthalia",
      eyebrow: "",
      title: "Arti Sonthalia",
      count: "",
      items: [
        { type: "video", src: "Videos/Arthi%20Sonthalia/Discoveri%20Oaks%201.mp4", label: "Discoveri Oaks, Hyderabad", ratio: "4/5" },
        { type: "photo", src: "Photos/Arthi%20Sonthalia/DSC02765.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" },
        { type: "photo", src: "Photos/Arthi%20Sonthalia/DSC02772.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" },
        { type: "photo", src: "Photos/Arthi%20Sonthalia/DSC02781.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" },
        { type: "photo", src: "Photos/Arthi%20Sonthalia/DSC02770.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" },
        { type: "photo", src: "Photos/Arthi%20Sonthalia/DSC02785.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" },
        { type: "photo", src: "Photos/Arthi%20Sonthalia/DSC02795.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" },
        { type: "photo", src: "Photos/Arthi%20Sonthalia/DSC02804.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" },
        { type: "video", src: "Videos/Arthi%20Sonthalia/Discoveri%20Oaks%202.mp4", label: "Discoveri Oaks, Hyderabad", ratio: "4/5" },
        { type: "photo", src: "Photos/Arthi%20Sonthalia/DSC02797.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" },
        { type: "photo", src: "Photos/Arthi%20Sonthalia/DSC02820.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" },
        { type: "photo", src: "Photos/Arthi%20Sonthalia/DSC02806.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" },
        { type: "photo", src: "Photos/Arthi%20Sonthalia/DSC02831.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" },
        { type: "photo", src: "Photos/Arthi%20Sonthalia/DSC02810.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" },
        { type: "photo", src: "Photos/Arthi%20Sonthalia/DSC02823.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" },
        { type: "photo", src: "Photos/Arthi%20Sonthalia/DSC02776.jpg", name: "Arti Sonthalia", year: "", ratio: "4/5" }
      ]
    },
    {
      id: "festival-of-play",
      eyebrow: "",
      title: "Festival of Play",
      count: "",
      items: [
        { type: "photo", src: "Photos/Festival%20of%20Play/DSC00228.JPG", name: "Festival of Play", year: "", ratio: "3/2" },
        { type: "photo", src: "Photos/Festival%20of%20Play/DSC00733.JPG", name: "Festival of Play", year: "", ratio: "3/2" },
        { type: "photo", src: "Photos/Festival%20of%20Play/DSC00332.JPG", name: "Festival of Play", year: "", ratio: "3/2" },
        { type: "photo", src: "Photos/Festival%20of%20Play/DSC00922.JPG", name: "Festival of Play", year: "", ratio: "3/2" },
        { type: "photo", src: "Photos/Festival%20of%20Play/DSC00342.JPG", name: "Festival of Play", year: "", ratio: "3/2" },
        { type: "photo", src: "Photos/Festival%20of%20Play/DSC01166.JPG", name: "Festival of Play", year: "", ratio: "3/2" },
        { type: "photo", src: "Photos/Festival%20of%20Play/DSC00510.JPG", name: "Festival of Play", year: "", ratio: "3/2" },
        { type: "photo", src: "Photos/Festival%20of%20Play/DSC00744.JPG", name: "Festival of Play", year: "", ratio: "3/2" }
      ]
    },
    {
      id: "you-can-sit-with-us",
      eyebrow: "",
      title: "You Can Sit With Us",
      count: "",
      items: [
        { type: "video", src: "Videos/You%20Can%20Sit%20With%20Us/A%20tiffin%20center%20transformed%20into%20something%20otherworldly.%20A%20glimpse%20into%20the%20world%20we%20reimagined%2C.mp4", label: "", ratio: "9/16" },
        { type: "video", src: "Videos/You%20Can%20Sit%20With%20Us/You%20Can%20Sit%20With%20Us%20dinner%20experiences%20are%20anything%20but%20conventional.%20We%20transform%20the%20ordinary%20.mp4", label: "", ratio: "9/16" },
        { type: "video", src: "Videos/You%20Can%20Sit%20With%20Us/%F0%9F%8F%AEFor%20one%20night%2C%20a%20South%20Indian%20tiffin%20center%20vanished%20and%20in%20its%20place%2C%20a%20Japanese%20yatai%20appear.mp4", label: "", ratio: "9/16" },
        { type: "video", src: "Videos/You%20Can%20Sit%20With%20Us/%F0%9F%92%9B%20The%20air%20was%20alive%20with%20a%20symphony%20of%20flavors%2C%20each%20note%20harmonizing%20with%20the%20hum%20of%20hands%20at%20.mp4", label: "", ratio: "9/16" }
      ]
    }
  ]
};
