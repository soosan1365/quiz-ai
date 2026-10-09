
import type { Quiz } from "@/types/quiz";
export const quizzes: Quiz[] = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    description: "Test your knowledge of artificial intelligence.",
    level: "Beginner",
    questions: [
      {
        id: "q1",
        text: "What does AI stand for?",
        options: [
          "Automated Internet",
          "Artificial Intelligence",
          "Advanced Interface",
          "Applied Information",
        ],
        correctAnswer: 1,
        explanation: "AI stands for Artificial Intelligence.",
      },
      {
        id: "q2",
        text: "Which is an example of AI?",
        options: [
          "A basic calculator",
          "A paper notebook",
          "A voice assistant",
          "A light switch",
        ],
        correctAnswer: 2,
        explanation: "Voice assistants use AI to understand and respond to requests.",
      },
      {
        id: "q3",
        text: "What is machine learning?",
        options: [
          "A type of computer hardware",
          "A way for computers to learn patterns from data",
          "A programming language",
          "A computer screen",
        ],
        correctAnswer: 1,
        explanation: "Machine learning allows systems to learn patterns from data.",
      },
      {
        id: "q4",
        text: "What is training data used for?",
        options: [
          "Teaching an AI model",
          "Charging a computer",
          "Designing a keyboard",
          "Connecting a monitor",
        ],
        correctAnswer: 0,
        explanation: "Training data helps a model learn patterns and relationships.",
      },
      {
        id: "q5",
        text: "Can AI make mistakes?",
        options: [
          "No, never",
          "Only when offline",
          "Yes, AI can produce incorrect results",
          "Only on old computers",
        ],
        correctAnswer: 2,
        explanation: "AI can make mistakes, so its results should be checked.",
      },
    ],
  },
  
{
  id: "machine-learning",
  title: "Machine Learning",
  description: "Test your understanding of machine learning concepts.",
  level: "Intermediate",
  questions: [
    {
      id: "ml-q1",
      text: "What is the main goal of supervised learning?",
      options: [
        "To learn from labeled data",
        "To group data without labels",
        "To store data in a database",
        "To design computer hardware",
      ],
      correctAnswer: 0,
      explanation:
        "Supervised learning uses labeled examples to learn the relationship between inputs and expected outputs.",
    },
    {
      id: "ml-q2",
      text: "Which task is an example of classification?",
      options: [
        "Predicting tomorrow's temperature",
        "Predicting a house price",
        "Classifying an email as spam or not spam",
        "Calculating the average of a list",
      ],
      correctAnswer: 2,
      explanation:
        "Classification predicts a category or class, such as spam or not spam.",
    },
    {
      id: "ml-q3",
      text: "What does regression usually predict?",
      options: [
        "A category label",
        "A continuous numerical value",
        "A database table",
        "A programming language",
      ],
      correctAnswer: 1,
      explanation:
        "Regression is commonly used to predict numerical values, such as prices or temperatures.",
    },
    {
      id: "ml-q4",
      text: "What is unsupervised learning?",
      options: [
        "Learning from labeled examples only",
        "Learning without any data",
        "Learning patterns from unlabeled data",
        "Following manually written rules only",
      ],
      correctAnswer: 2,
      explanation:
        "Unsupervised learning looks for patterns or structure in data without provided target labels.",
    },
    {
      id: "ml-q5",
      text: "What is overfitting?",
      options: [
        "A model performs well on training data but poorly on new data",
        "A model cannot process any data",
        "A model always predicts the same correct answer",
        "A dataset contains no features",
      ],
      correctAnswer: 0,
      explanation:
        "Overfitting occurs when a model learns training-specific patterns too closely and fails to generalize well.",
    },
    {
      id: "ml-q6",
      text: "Why do we use a test dataset?",
      options: [
        "To train the model repeatedly",
        "To evaluate performance on data not used for training",
        "To replace the training algorithm",
        "To remove every feature",
      ],
      correctAnswer: 1,
      explanation:
        "A test dataset estimates how well a trained model performs on unseen data.",
    },
    {
      id: "ml-q7",
      text: "Which algorithm is commonly used for classification and regression?",
      options: [
        "Linear search",
        "Bubble sort",
        "Decision tree",
        "Binary encoding",
      ],
      correctAnswer: 2,
      explanation:
        "Decision trees can be used for classification and regression tasks.",
    },
    {
      id: "ml-q8",
      text: "What is a feature in a machine learning dataset?",
      options: [
        "An input variable used by the model",
        "The final model accuracy only",
        "A type of computer monitor",
        "The name of the training folder",
      ],
      correctAnswer: 0,
      explanation:
        "A feature is an input attribute that can help a model make predictions.",
    },
    {
      id: "ml-q9",
      text: "What is the purpose of a validation dataset?",
      options: [
        "To permanently store the source code",
        "To tune model settings and compare model choices",
        "To replace all training examples",
        "To guarantee perfect predictions",
      ],
      correctAnswer: 1,
      explanation:
        "Validation data helps select models and tune hyperparameters without using the final test set for those decisions.",
    },
    {
      id: "ml-q10",
      text: "What does model generalization mean?",
      options: [
        "Memorizing every training example",
        "Using more memory than other models",
        "Performing well on new, unseen data",
        "Always producing identical predictions",
      ],
      correctAnswer: 2,
      explanation:
        "Generalization is the ability to perform well on data that was not used during training.",
    },
  ],
},
{
  id: "prompt-engineering",
  title: "Prompt Engineering",
  description: "Test your understanding of prompt engineering techniques.",
  level: "Beginner",
  questions: [
    {
      id: "pe-q1",
      text: "What is a prompt in AI?",
      options: [
        "A computer's hardware component",
        "An instruction or input given to an AI model",
        "A type of database",
        "A programming language"
      ],
      correctAnswer: 1,
      explanation: "A prompt is the instruction or input that guides an AI model's response."
    },
    {
      id: "pe-q2",
      text: "Which prompt is more specific?",
      options: [
        "Tell me about technology",
        "Write something interesting",
        "Explain how solar panels generate electricity in three steps",
        "Give me information"
      ],
      correctAnswer: 2,
      explanation: "Specific prompts define the topic and expected structure, making the desired response clearer."
    },
    {
      id: "pe-q3",
      text: "What is the purpose of providing context in a prompt?",
      options: [
        "To help the model understand the situation and task",
        "To make the model run without input",
        "To guarantee every answer is correct",
        "To remove the need for instructions"
      ],
      correctAnswer: 0,
      explanation: "Context helps the model interpret the request and produce a more relevant response."
    },
    {
      id: "pe-q4",
      text: "What does zero-shot prompting mean?",
      options: [
        "Giving the model several example answers",
        "Asking the model to answer without examples in the prompt",
        "Training a new AI model from scratch",
        "Asking the model to refuse every request"
      ],
      correctAnswer: 1,
      explanation: "Zero-shot prompting asks the model to perform a task without providing task-specific examples."
    },
    {
      id: "pe-q5",
      text: "When is few-shot prompting useful?",
      options: [
        "When you want to provide examples of the desired output",
        "When you want to remove all context",
        "When you need to replace the AI model",
        "When you want to disable the model"
      ],
      correctAnswer: 0,
      explanation: "Few-shot prompting includes examples that help demonstrate the expected pattern or format."
    },
    {
      id: "pe-q6",
      text: "Which instruction best defines the desired output format?",
      options: [
        "Make it good",
        "Write something useful",
        "Answer however you want",
        "Return the answer as a JSON object with name and age fields"
      ],
      correctAnswer: 3,
      explanation: "Explicitly specifying the output format and required fields makes the expected result clearer."
    }
  ]
},
{
  id: "llm-development",
  title: "LLM Development",
  description: "Test your understanding of large language models and how they work.",
  level: "Intermediate",
  questions: [
    {
      id: "llm-q1",
      text: "What does LLM stand for?",
      options: [
        "Logical Learning Machine",
        "Large Language Model",
        "Linked Language Module",
        "Linear Logic Method"
      ],
      correctAnswer: 1,
      explanation: "LLM stands for Large Language Model, a type of AI model trained to process and generate language."
    },
    {
      id: "llm-q2",
      text: "What is a token in a language model?",
      options: [
        "A unit of text processed by the model",
        "A complete database table",
        "A computer's processor",
        "A type of network cable"
      ],
      correctAnswer: 0,
      explanation: "Tokens are units of text, such as words, parts of words, or punctuation, that a language model processes."
    },
    {
      id: "llm-q3",
      text: "What is the main purpose of a context window?",
      options: [
        "To store every conversation permanently",
        "To make the model train itself automatically",
        "To limit the amount of input and conversation context considered at once",
        "To determine the user's internet speed"
      ],
      correctAnswer: 2,
      explanation: "A context window defines how much tokenized input the model can consider in a single interaction."
    },
    {
      id: "llm-q4",
      text: "What is an embedding?",
      options: [
        "A list of website URLs",
        "A numerical representation of data, such as text",
        "A method for styling web pages",
        "A type of database password"
      ],
      correctAnswer: 1,
      explanation: "Embeddings represent items such as words or documents as numerical vectors that capture useful relationships."
    },
    {
      id: "llm-q5",
      text: "What is Retrieval-Augmented Generation (RAG)?",
      options: [
        "A method that retrieves relevant information to help generate a response",
        "A technique for deleting model parameters",
        "A way to increase screen resolution",
        "A programming language for neural networks"
      ],
      correctAnswer: 0,
      explanation: "RAG retrieves relevant information from an external source and provides it to the model as context for generation."
    },
    {
      id: "llm-q6",
      text: "What is fine-tuning?",
      options: [
        "Changing the color of a model's interface",
        "Removing all training data from a model",
        "Converting text into an image",
        "Further training a pretrained model on a more specific dataset"
      ],
      correctAnswer: 3,
      explanation: "Fine-tuning continues training a pretrained model on selected data to adapt it to a task or domain."
    },
    {
      id: "llm-q7",
      text: "What does temperature generally control during text generation?",
      options: [
        "The model's context window size",
        "The randomness of token selection",
        "The number of model layers",
        "The size of the training dataset"
      ],
      correctAnswer: 1,
      explanation: "Temperature affects the distribution used for token selection; higher values generally produce more varied outputs."
    },
    {
      id: "llm-q8",
      text: "What is a hallucination in an LLM response?",
      options: [
        "A response that is always too short",
        "A delay while generating text",
        "A confident-sounding response that contains unsupported or fabricated information",
        "A response written in another language"
      ],
      correctAnswer: 2,
      explanation: "A hallucination is generated content that may sound plausible but is false or unsupported by the available evidence."
    },
    {
      id: "llm-q9",
      text: "Why might developers use a vector database with an LLM application?",
      options: [
        "To store and search vector embeddings efficiently",
        "To replace the user interface",
        "To compile TypeScript code",
        "To guarantee every model response is correct"
      ],
      correctAnswer: 0,
      explanation: "Vector databases support similarity search over embeddings, which can help retrieve relevant information for an LLM."
    },
    {
      id: "llm-q10",
      text: "What is the role of a system message in a chat-based LLM application?",
      options: [
        "To store the application's CSS",
        "To replace all user messages",
        "To guarantee access to the internet",
        "To provide high-level instructions or behavior guidance for the model"
      ],
      correctAnswer: 3,
      explanation: "A system message can establish instructions, constraints, and behavior guidance for the model."
    },
    {
      id: "llm-q11",
      text: "Why is it important to evaluate an LLM application?",
      options: [
        "To ensure the model never makes mistakes",
        "To measure how well it performs on relevant tasks and identify weaknesses",
        "To eliminate the need for testing",
        "To guarantee that every user likes its responses"
      ],
      correctAnswer: 1,
      explanation: "Evaluation helps measure quality, reliability, and task performance, while revealing areas that need improvement."
    },
    {
      id: "llm-q12",
      text: "What is the purpose of structured output in an LLM application?",
      options: [
        "To make responses longer",
        "To prevent the model from processing questions",
        "To make responses follow a defined format, such as a JSON schema",
        "To replace the need to validate data"
      ],
      correctAnswer: 2,
      explanation: "Structured output helps responses follow a predictable format, though applications should still validate the returned data."
    }
  ]
}
];