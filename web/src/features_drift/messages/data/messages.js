export const getMessages = async (chatId) => {
  // Mock data - replace with API call
  const messagesData = {
    1: [
      {
        id: 1,
        sender: "other",
        text: "Hey! How's it going?",
        time: "10:30 AM",
        avatar: "/avatars/rahul.jpg",
      },
      {
        id: 2,
        sender: "me",
        text: "I'm good, thanks! How about you?",
        time: "10:32 AM",
        avatar: "/avatars/me.jpg",
      },
      {
        id: 3,
        sender: "other",
        text: "Great! Have you read the new book?",
        time: "10:33 AM",
        avatar: "/avatars/rahul.jpg",
      },
    ],
    2: [
      {
        id: 1,
        sender: "other",
        text: "Thanks for the book recommendation!",
        time: "9:15 AM",
        avatar: "/avatars/priya.jpg",
      },
      {
        id: 2,
        sender: "me",
        text: "You're welcome! Did you like it?",
        time: "9:20 AM",
        avatar: "/avatars/me.jpg",
      },
    ],
    3: [
      {
        id: 1,
        sender: "other",
        text: "Let's discuss the book club meeting",
        time: "8:00 AM",
        avatar: "/avatars/amit.jpg",
      },
    ],
  };

  // Return messages for the specific chat, or empty array if not found
  return messagesData[chatId] || [];
};