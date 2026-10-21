export interface Question {
  id: number;
  topic: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    topic: 'Cloud Concepts',
    prompt: 'What is cloud computing?',
    options: [
      'Saving all your files on a USB flash drive',
      'Using computing services like servers, storage and software over the internet',
      'Buying and keeping your own servers in your office',
      'A tool for forecasting the weather',
    ],
    correctIndex: 1,
    explanation:
      'Cloud computing means you use computing services over the internet instead of owning and running the equipment yourself.',
  },
  {
    id: 2,
    topic: 'Cloud Concepts',
    prompt:
      'An online shop gets many more visitors during a holiday sale. It needs to add more computing power quickly, then reduce it after the sale. Which cloud benefit does this describe?',
    options: ['Security', 'Reliability', 'Scalability', 'Governance'],
    correctIndex: 2,
    explanation:
      'Scalability means you can increase or decrease your resources when demand changes. This is like a market stall adding more helpers on a busy Saturday and sending them home when it is quiet.',
  },
  {
    id: 3,
    topic: 'Cloud Concepts',
    prompt:
      'What is one advantage of the pay-as-you-go cloud pricing model?',
    options: [
      'You only pay for the resources you use',
      'You must buy all the servers before you start',
      'You pay the same amount whether you use the service or not',
      'You must sign a 10-year contract',
    ],
    correctIndex: 0,
    explanation:
      "With pay-as-you-go, your cost goes up when you use more and down when you use less. You don't spend a large amount of money upfront.",
  },
  {
    id: 4,
    topic: 'Cloud Concepts',
    prompt: 'Which statement best describes a public cloud?',
    options: [
      'Servers owned and used only by your company, in your own building',
      'A mix of your own servers and cloud services',
      'A computer that works without any internet',
      'Services owned and run by a provider like Microsoft, and shared by many customers over the internet',
    ],
    correctIndex: 3,
    explanation:
      'In a public cloud, the provider owns and manages the hardware, and many customers use it. A is a private cloud and B is a hybrid cloud.',
  },
  {
    id: 5,
    topic: 'Cloud Concepts',
    prompt: 'Which of these is an example of Software as a Service (SaaS)?',
    options: [
      'Renting a virtual machine and installing your own software on it',
      'Using a web-based email service where the provider looks after everything behind the scenes',
      'Buying physical servers for your office',
      'Writing your own operating system',
    ],
    correctIndex: 1,
    explanation:
      'With SaaS, you just use the finished software, and the provider manages the servers, updates and security. A is IaaS (Infrastructure as a Service).',
  },
  {
    id: 6,
    topic: 'Azure Architecture & Services',
    prompt: 'What is an Azure region?',
    options: [
      'A single server inside a datacenter',
      'A Microsoft office where employees work',
      'A geographic area that contains one or more Azure datacenters',
      'A type of Azure subscription',
    ],
    correctIndex: 2,
    explanation:
      'Azure has many regions around the world. Each region is an area with one or more datacenters, so you can place your apps close to your users.',
  },
  {
    id: 7,
    topic: 'Azure Architecture & Services',
    prompt: 'Why would you use availability zones for your app?',
    options: [
      'To keep your app running if one datacenter in a region has a problem',
      'To reduce costs by deleting unused resources',
      'To connect your office to the internet',
      'To store your passwords safely',
    ],
    correctIndex: 0,
    explanation:
      'Availability zones are separate datacenter locations inside the same region. If one has a power or equipment problem, your app can keep running from another.',
  },
  {
    id: 8,
    topic: 'Azure Architecture & Services',
    prompt:
      'You are building a website for a project. It uses a database, file storage and a web app. Which Azure feature lets you keep all these resources together in one container so you can manage them as a group?',
    options: [
      'Virtual machine',
      'Availability zone',
      'Azure region',
      'Resource group',
    ],
    correctIndex: 3,
    explanation:
      'A resource group is a container that holds related Azure resources. You can manage them together, and deleting the group deletes everything inside it.',
  },
  {
    id: 9,
    topic: 'Azure Architecture & Services',
    prompt:
      'Which Azure service is best for storing large amounts of unstructured data, such as photos and videos?',
    options: [
      'Azure Virtual Network',
      'Azure Blob Storage',
      'Azure Policy',
      'Microsoft Entra ID',
    ],
    correctIndex: 1,
    explanation:
      'Azure Blob Storage is built for large amounts of unstructured data like images, videos and documents. Think of it as a very big, flexible storage room.',
  },
  {
    id: 10,
    topic: 'Azure Architecture & Services',
    prompt:
      'Which Azure service manages user sign-ins and controls who can access apps and resources?',
    options: [
      'Azure Blob Storage',
      'Azure Virtual Machines',
      'Microsoft Entra ID',
      'Availability zones',
    ],
    correctIndex: 2,
    explanation:
      "Microsoft Entra ID is Azure's identity and access service. It checks who a user is and what they are allowed to do. You may also see its old name, Azure Active Directory, in older materials.",
  },
  {
    id: 11,
    topic: 'Azure Management & Governance',
    prompt:
      'Before creating any resources, you want to estimate how much a planned Azure setup will cost each month. Which tool should you use?',
    options: [
      'Azure Policy',
      'Azure Pricing Calculator',
      'Microsoft Entra ID',
      'Azure Blob Storage',
    ],
    correctIndex: 1,
    explanation:
      'The Pricing Calculator lets you choose the Azure services you plan to use and shows an estimated cost before you spend any money.',
  },
  {
    id: 12,
    topic: 'Azure Management & Governance',
    prompt:
      'Your company wants a rule that all new Azure resources must be created only in approved regions. Which Azure service can enforce this rule?',
    options: [
      'Resource group',
      'Availability zone',
      'Azure Pricing Calculator',
      'Azure Policy',
    ],
    correctIndex: 3,
    explanation:
      'Azure Policy lets you set rules for your resources and checks that they follow them. If a resource breaks the rule, it can be flagged or blocked.',
  },
  {
    id: 13,
    topic: 'Azure Management & Governance',
    prompt:
      'A team member accidentally deleted an important database. How can you stop this from happening again?',
    options: [
      'Add a resource lock to the database',
      'Move the database to a different region',
      'Rename the database',
      'Turn off the Azure Portal',
    ],
    correctIndex: 0,
    explanation:
      'A resource lock prevents a resource from being deleted or changed by mistake. Even people with permission must remove the lock first.',
  },
  {
    id: 14,
    topic: 'Azure Management & Governance',
    prompt:
      'Your company wants to see how much each department spends on Azure. You add labels like "Department: Marketing" to resources. What are these labels called?',
    options: ['Locks', 'Policies', 'Tags', 'Regions'],
    correctIndex: 2,
    explanation:
      'Tags are labels you attach to resources. They help you organize resources and see costs by department, project or owner.',
  },
  {
    id: 15,
    topic: 'Azure Management & Governance',
    prompt:
      'Which Azure service collects and shows information about how your apps and resources are performing, so you can spot problems early?',
    options: [
      'Azure Policy',
      'Azure Monitor',
      'Resource lock',
      'Azure Pricing Calculator',
    ],
    correctIndex: 1,
    explanation:
      'Azure Monitor gathers data like performance and errors from your resources. It can also send alerts when something goes wrong.',
  },
];
