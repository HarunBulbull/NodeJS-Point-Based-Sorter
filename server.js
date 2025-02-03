const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
    origin: '*',
    credentials: true,
};

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const parameters = [
    {
        title: "Coding for Beginners: Build Your First Website in 30 Minutes",
        description: "Learn the basics of HTML, CSS, and JavaScript and create your own website from scratch. This tutorial is perfect for beginners with no prior coding experience.",
        tags: ["coding", "programming", "web development", "HTML", "CSS", "JavaScript", "tutorial", "beginner", "learn to code", "website development"]
    },
    {
        title: "Mastering Python Lists: A Beginner's Guide",
        description: "This video covers everything you need to know about lists in Python, from basic creation to advanced manipulation techniques. Perfect for beginners learning Python programming.",
        tags: ["python", "programming", "coding", "lists", "data structures", "beginner", "tutorial", "learn python", "python lists", "array"]
    },
    {
        title: "Debugging 101: Tips and Tricks for Fixing Your Code",
        description: "Code acting up? This video covers essential debugging techniques and strategies to help you identify and fix errors in your code quickly and efficiently.  Learn how to use debugging tools and develop a systematic approach to troubleshooting.",
        tags: ["coding", "programming", "debugging", "errors", "bugs", "software development", "troubleshooting", "tips", "tricks", "beginner", "intermediate"]
    },
    {
        title: "Building a Simple To-Do App with JavaScript",
        description: "Learn to build a functional to-do list application using HTML, CSS, and JavaScript. This project-based tutorial is perfect for beginners looking to apply their JavaScript skills and create a real-world application.",
        tags: ["javascript", "coding", "programming", "web development", "html", "css", "todo app", "project tutorial", "beginner", "learn javascript", "front-end development"]
    },
    {
        title: "Intro to Git and GitHub: Version Control for Beginners",
        description: "Learn the basics of Git and GitHub, essential tools for any developer. This tutorial covers version control concepts, basic Git commands, and how to use GitHub for collaboration and project management. Perfect for beginners getting started with software development.",
        tags: ["git", "github", "version control", "coding", "programming", "software development", "collaboration", "tutorial", "beginner", "learn git", "git commands"]
    },
    {
        title: "Data Structures and Algorithms: Linked Lists Explained",
        description: "This video provides a clear and concise explanation of linked lists, a fundamental data structure in computer science.  We'll cover the different types of linked lists, how they work, and their common use cases.  Ideal for students and anyone looking to strengthen their understanding of data structures and algorithms.",
        tags: ["data structures", "algorithms", "linked lists", "coding", "programming", "computer science", "tutorial", "beginner", "intermediate", "learn data structures", "data structures and algorithms"]
    },
    {
        title: "React Router Tutorial: Build Navigation in Your React App",
        description: "Learn how to implement routing in your React applications using React Router. This tutorial covers setting up React Router, creating routes, navigating between pages, and working with dynamic routes and parameters. Perfect for React developers looking to build multi-page applications.",
        tags: ["react", "react router", "routing", "navigation", "web development", "javascript", "front-end", "tutorial", "reactjs", "web app", "single page application"]
    },
    {
        title: "Asynchronous JavaScript: Promises and Async/Await",
        description: "This video explains asynchronous programming in JavaScript, focusing on Promises and the cleaner Async/Await syntax. Learn how to handle asynchronous operations, avoid callback hell, and write more efficient and readable code.  We'll cover practical examples and use cases.",
        tags: ["javascript", "asynchronous", "promises", "async/await", "callbacks", "programming", "coding", "web development", "tutorial", "intermediate", "js"]
    },
    {
        title: "Creating a REST API with Node.js and Express",
        description: "Learn how to build a RESTful API using Node.js and the Express framework. This tutorial covers setting up a server, defining routes, handling requests, and working with data. Ideal for backend developers and anyone wanting to learn API development.",
        tags: ["node.js", "express", "api", "rest api", "backend", "web development", "javascript", "coding", "programming", "tutorial", "restful api"]
    },
    {
        title: "Introduction to Object-Oriented Programming (OOP) in Python",
        description: "This video provides a beginner-friendly introduction to Object-Oriented Programming (OOP) concepts in Python. We'll cover classes, objects, inheritance, polymorphism, and encapsulation with clear examples.  Learn how to write more organized, reusable, and maintainable code using OOP principles.",
        tags: ["python", "oop", "object-oriented programming", "programming", "coding", "classes", "objects", "inheritance", "polymorphism", "encapsulation", "tutorial", "beginner", "learn python"]
    },
]

const titlePoint = 3;
const tagPoint = 2;
const descPoint = 1;

app.get("/:text", async (req, res) => {
    try {
        const text = req.params.text.replace(/[^\w\s]|_/g, "").toLocaleLowerCase();
        const results = parameters.map((parameter) => {
            let title = 0;
            let description = 0;
            let tag = 0;

            text.split(" ").map((word1) => {
                parameter.title.split(" ").map((word2) => {
                    if (word2.replace(/[^\w\s]|_/g, "").toLocaleLowerCase().includes(word1)) {
                        { title = title + titlePoint; }
                    }
                })

                parameter.description.split(" ").map((word2) => {
                    if (word2.replace(/[^\w\s]|_/g, "").toLocaleLowerCase().includes(word1)) {
                        { description = description + descPoint; }
                    }
                })

                parameter.tags.map((word2) => {
                    if (word2.replace(/[^\w\s]|_/g, "").toLocaleLowerCase().includes(word1)) {
                        { tag = tag + tagPoint; }
                    }
                })
            })

            return { ...parameter, titlePoint: title, descriptionPoint: description, tagPoint: tag }
        }).sort((a, b) => {
            const totalA = a.titlePoint + a.descriptionPoint + a.tagPoint;
            const totalB = b.titlePoint + b.descriptionPoint + b.tagPoint;
            return totalB - totalA;
        });
        res.status(200).json(results);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "There is an error: " + error });
    }
});



app.listen(port, () => { console.log(`Server is running on port ${port}`); })
