import React, { useState } from "react";
import { Nav, NavItem, Tab, Tabs } from "react-bootstrap";
import ProfileSideBar from "./ProfileSideBar";
import { FaChevronRight, FaSearch } from "react-icons/fa";

const faqData = [
  {
    topic: "Sell Your Property FAQs",
    issues: [
      {
        question: "How do I list my property on Goolok?",
        answer:
          "To get started, log in to your seller account and go to the “Create Listing” section. Fill in the property details, upload images, and provide documentation for verification. Your listing will go live once it’s approved by our team.",
      },
      {
        question: "What types of properties can I list on Goolok?",
        answer:
          "Goolok accepts listings for various types of properties, including residential, commercial, industrial, and agricultural land. As long as you provide the required documentation, you can list properties that suit any buyer’s needs..",
      },
      {
        question: "Is there a verification process for listed properties?",
        answer:
          "Yes, all listings go through a verification process. Sellers must upload supporting  documents (ownership proofs, title deeds, etc.), which are reviewed by our team to ensure legitimacy and build trust with potential buyers.",
      },
      {
        question:
          "How does Goolok help increase the visibility of my property?",
        answer:
          "Verified listings gain priority in search results, which increases visibility to potential buyers. Additionally, Goolok provides marketing tools for promoting your listing, along with options for featuring your property on our platform.",
      },
      {
        question: "Can I manage multiple listings on Goolok?",
        answer:
          "Yes, sellers can manage multiple properties within their dashboard. You can track inquiries, update property details, and view listing performance, all in one place for streamlined management.",
      },
      {
        question: "Does Goolok assist with documentation and legal aspects?",
        answer:
          " Absolutely. Goolok offers legal guidance and support for documentation to make the selling process straightforward. Our team helps ensure that all legal requirements are met, building buyer trust and expediting transactions.",
      },
      {
        question: "What pricing tools does Goolok provide for sellers?",
        answer:
          " Goolok’s analytics include valuation tools and market insights that give you an idea of pricing trends, enabling you to competitively price your property based on real-time data and buyer demand.",
      },
      {
        question: "How do I respond to buyer inquiries on Goolok?",
        answer:
          "Our in-platform messaging system allows you to communicate directly with interested buyers. Additionally, some listings include a “WhatsApp” contact option for quicker, real-time responses.",
      },
      {
        question: " Can I track how my listings are performing?",
        answer:
          "Yes, Goolok provides insights on each listing, including views, inquiries, and other metrics. These insights help you understand the level of buyer interest and optimize your listings accordingly.",
      },
      {
        question: "Who can I contact if I need assistance with my listing?",
        answer:
          "Our support team is available via chat, email, or WhatsApp to help with listing questions, document verification, and general guidance. We’re here to make your selling experience on Goolok as seamless as possible.",
      },
    ],
  },
  {
    topic: "Google Map Location Marking Service FAQs",
    issues: [
      {
        question: "What is the Google Map Location Marking Service?",
        answer:
          "Our Google Map Location Marking Service helps property owners, businesses, or land managers add their property or business location to Google Maps. This ensures better visibility and accurate navigation for users.",
      },
      {
        question: "Why should I mark my location on Google Maps?",
        answer: [
          "Enhanced visibility for potential buyers or clients.",
          "Accurate navigation for visitors and deliveries.",
          "Establishing credibility for your property or business.",
          "Improved online presence and searchability.",
        ],
      },
      {
        question: "What details are required to mark a location?",
        answer: [
          "Property or business name.",
          "Full address and pin code.",
          "Survey number and Subdivision number.",
        ],
      },
      {
        question: "How does the process work?",
        answer: [
          "Step 1 : Submit your request through our website with the necessary details.",
          "Step 2 : Our team will verify the information provided.",
          "Step 3 : We will create or update your location on Google Maps.",
        ],
      },
      {
        question: "Can I mark locations for vacant land?",
        answer: "Yes, you can mark vacant land or plots.",
      },
      {
        question: "Are there any charges for this service?",
        answer: "There are no charges for this service.",
      },
      {
        question: "How do I contact your team for support?",
        answer:
          "You can reach our support team through the Contact Us page on our website or call our helpline for assistance.",
      },
    ],
  },
  {
    topic: "Missing Document Service FAQs",
    issues: [
      {
        question: "What is the Missing Document Service?",
        answer:
          "The Missing Document Service helps individuals retrieve or reapply for important property-related documents that may have been lost, misplaced, or damaged.",
      },
      {
        question: "What types of documents can you help retrieve?",
        answer: [
          "Sale deeds.",
          "Patta documents.",
          "Encumbrance certificates (EC).",
          "Property tax receipts.",
          "Land ownership records.",
        ],
      },
      {
        question: "How does the process work?",
        answer: [
          "Step 1 : Submit a service request on our website with the required details about the missing document.",
          "Step 2 : Our team will review your request and gather necessary information.",
          "Step 3 : We will coordinate with the relevant authorities or government offices to retrieve or reapply for the document.",
          "Step 4 : The retrieved document will be delivered to you securely.",
        ],
      },
      {
        question: "What information is required to initiate a request?",
        answer: [
          "Property details (e.g., survey number, location).",
          "Owner’s identification details.",
          "Any available supporting documents (if applicable).",
        ],
      },
      {
        question: "How long does it take to retrieve a document?",
        answer:
          "The timeline varies based on the type of document and the processing time of the respective government office. Generally, it may take anywhere from 2-8 weeks.",
      },
      {
        question: "Are there any additional charges for this service?",
        answer:
          "The total cost includes our service fee and any official fees required by government offices. We provide a detailed cost estimate before starting the process.",
      },
      {
        question: "Is it possible to track my request?",
        answer:
          "Yes, you can track the status of your request through your account on our website. Updates will also be shared via email or SMS.",
      },
      {
        question: "What if the document cannot be retrieved?",
        answer:
          "If the document cannot be retrieved due to insufficient information or other constraints, we will inform you promptly and suggest alternative solutions, such as applying for duplicates.",
      },
      {
        question:
          "Are there legal implications for retrieving missing documents?",
        answer:
          "Our process strictly adheres to legal procedures. We also ensure that all applications for duplicate documents comply with government regulations.",
      },
      {
        question: "How do I contact support for further questions?",
        answer:
          "You can reach our support team via the Contact Us page on our website or by calling our helpline.",
      },
    ],
  },
  {
    topic: "Patta Service FAQs",
    issues: [
      {
        question: "What exactly is a Patta, and why is it important?",
        answer:
          "A Patta is a government-issued land ownership record in India that is essential for proving lawful possession of land. It includes details like the owner’s name, survey number, and classification of the land, makingit essential in cases of inheritance, property sales, and land disputes. It also establishes eligibility for government compensations, tax benefits, and development approvals.",
      },
      {
        question:
          "Why should I apply for a Patta through Goolok instead of doing it myself?",
        answer:
          " While you can apply for a Patta on your own, the process can be complex and time-consuming due to intricate legal and bureaucratic procedures. Goolok’s expert team handles all aspects of the application, including document review, submission, and follow-up, ensuring a smoother and more efficient process with minimal delays or issues.",
      },
      {
        question:
          "What types of documents are required for a Patta application?",
        answer:
          "Common documents include your sale deed, proof of identity, tax receipts, and sometimes a previous Patta copy if available. At Goolok, we provide you with a comprehensive checklist tailored to your property location and type, ensuring that you submit all required documents correctly from the start.",
      },
      {
        question: "How does the Patta application process work with Goolok?",
        answer:
          "Once you initiate your request on our platform, our team will verify your documents, fill out the necessary applications, and handle all communication with government authorities. You’ll receive real-time updates and can track your application status through our portal, ensuring transparency and convenience.",
      },
      {
        question: "How long will it take to receive my Patta?",
        answer:
          "The duration depends on local regulations and administrative workflows. Generally, it can take anywhere from a few weeks to several months. Goolok’s dedicated team actively monitors the process, ensuring timely follow-up and quicker resolutions, whenever possible.",
      },
      {
        question: "How much does Goolok’s Patta service cost?",
        answer:
          "Our pricing is competitive and varies based on factors like property type, location, and urgency. You can request a customized quote through our platform to get a precise estimate tailored to your needs.",
      },
      {
        question:
          "What additional services does Goolok provide for Patta applications?",
        answer:
          "Besides standard Patta applications, Goolok offers transfer services for property sales, inheritance, and name corrections. We handle each step, from legal paperwork to obtaining the final Patta certificate with updated ownership details, so you don’t have to navigate the complexities alone.",
      },
      {
        question: "Will Goolok help if my Patta application encounters issues?",
        answer:
          "Absolutely. If your application is delayed or rejected, our team will identify the reasons, guide you on any additional requirements, and assist with resubmission. We’re committed to helping you secure your Patta efficiently and without unnecessary setbacks.",
      },
      {
        question:
          "Can Goolok help me update or correct information on an existing Patta?",
        answer:
          "Yes, if there are errors in your current Patta, or if you need updates such as name or address changes, Goolok offers a dedicated correction service. Our team handles the paperwork, verification, and submission to the respective authorities to make sure your records are accurate.",
      },
    ],
  },
  {
    topic: "Legal Opinion Service FAQs",
    issues: [
      {
        question: "What is the Legal Opinion Service?",
        answer:
          "Our Legal Opinion Service provides expert guidance and legal advice on property-related matters. This service helps ensure that your property transactions are legally sound and free of potential risks.",
      },
      {
        question: "What types of legal issues can this service cover?",
        answer: [
          "Verification of property ownership.",
          "Reviewing sale agreements or purchase deeds.",
          "Evaluating legal disputes or encumbrances on property.",
          "Guidance on property inheritance or partition.",
          "Compliance with local property laws and regulations.",
        ],
      },
      {
        question: "Who provides the legal opinions?",
        answer:
          " Our legal opinions are provided by qualified and experienced property lawyers who specialize in real estate law and property disputes.",
      },
      {
        question: "How does the process work?",
        answer: [
          "Step 1 : Submit your query or case details through our website.",
          "Step 2 : Our team will assess your request and connect you with an expert.",
          "Step 3 : The legal expert will review the documents and provide a comprehensive opinion or advice.",
          "Step 4 : You will receive a detailed report or consultation summary.",
        ],
      },
      {
        question: "What documents are required for a legal opinion?",
        answer: [
          "Property ownership documents (e.g., sale deed, patta).",
          "Encumbrance certificate (EC).",
          "Tax receipts.",
          "Any existing agreements, disputes, or court orders.",
        ],
      },
      {
        question: "Is the legal opinion valid in court?",
        answer:
          "While our legal experts provide reliable and well-researched opinions, they are advisory in nature. For litigation or court representation, additional legal steps may be required.",
      },
      {
        question: "How long does it take to get a legal opinion?",
        answer:
          "The timeline depends on the complexity of the case and the number of documents involved. Generally, it takes 5-10 working days for standard cases.",
      },
      {
        question: "How much does the Legal Opinion Service cost?",
        answer:
          "The cost varies based on the scope of work and complexity of the case. We provide a transparent quote before proceeding with the service.",
      },
      {
        question: "Can I get a second opinion?",
        answer:
          "Yes, if you wish to explore alternative perspectives, we can arrange a second opinion from another expert in our network.",
      },
      {
        question: "Is this service available for disputes or ongoing cases?",
        answer:
          "Yes, we can review disputes or ongoing cases to provide advice. However, for court representation, you may need to hire a dedicated legal counsel.",
      },
      {
        question: "How do I contact the legal expert for follow-ups?",
        answer:
          "You can communicate with the assigned legal expert through your account on our website or via the contact details provided once your case is assigned.",
      },
      {
        question: "Is my information kept confidential?",
        answer:
          "Yes, we maintain strict confidentiality for all client data and case details in compliance with privacy laws.",
      },
    ],
  },
  {
    topic: "Land Survey Service FAQs",
    issues: [
      {
        question: "What is a Land Survey, and why is it important?",
        answer:
          "A land survey is a process that measures and maps the dimensions and layout of a piece of land. It provides accurate information about boundaries, land area, and topographical features. Land surveys are essential for defining property limits, planning construction, resolving boundary disputes, and ensuring legal clarity in land transactions.",
      },
      {
        question: "When should I get a land survey done?",
        answer:
          "A land survey is a process that measures and maps the dimensions and layout of a piece of land. It provides accurate information about boundaries, land area, and topographical features. Land surveys are essential for defining property limits, planning construction, resolving boundary disputes, and ensuring legal clarity in land transactions.A land survey is crucial in various situations, such as buying or selling property, building or renovating, resolving boundary disputes, applying for construction permits, or updating property records. Regular land surveys can also help maintain accurate records over time.",
      },
      {
        question: "What is the process for a land survey?",
        answer:
          "A land survey typically involves site visits by professional surveyors who use measurement tools to map the property’s boundaries and features. After measurements are collected, the data is analyzed, and a survey report or map is generated, which includes accurate boundary details and topographical information.",
      },
      {
        question: "How long does a land survey take?",
        answer:
          "The timeline for a land survey depends on the size, complexity, and location of the property. Smaller, accessible plots may take only a few days, while larger or remote areas might take longer. Goolok provides estimated timelines based on your property’s specifics.",
      },
      {
        question: "What kind of equipment is used in land surveys?",
        answer:
          "Modern land surveys use advanced equipment like Total Stations, GPS, and laser measuring devices for precise measurements. Goolok ensures that all surveys are conducted with high-accuracy tools for reliable results.",
      },
      {
        question: "What is Manual Boundary Demarcation?",
        answer:
          "Manual Boundary Demarcation is a method of physically marking the boundaries of a property using traditional tools and measurements. This service is essential for properties with unclear or disputed boundaries, helping landowners establish visible markers to define their property limits.",
      },
      {
        question: "Why do I need Manual Boundary Demarcation?",
        answer:
          "Manual Boundary Demarcation is necessary when there are boundary disputes, unclear property lines, or during property transactions. It’s also helpful in cases where landowners want a visible confirmation of their property boundaries to prevent encroachment or misinterpretation.",
      },
      {
        question: "How does Manual Boundary Demarcation work?",
        answer:
          "In this process, surveyors visit the site to measure and mark the boundaries based on official records and survey data. Physical markers, such as boundary stones or stakes, are placed at key points to make the boundaries visible and accessible for future reference.",
      },
      {
        question: "Is Manual Boundary Demarcation legally recognized?",
        answer:
          "Yes, Manual Boundary Demarcation performed by licensed surveyors is legally recognized, especially when supported by official survey records. This process provides a clear and lawful representation of property boundaries, which is beneficial in legal and property transactions.",
      },
      {
        question: "How frequently should I update boundary demarcations?",
        answer:
          "Updating boundary demarcations is beneficial during property transactions, after significant changes to the land, or if there are disputes. Goolok recommends regular checks to ensure boundary markers remain in place and records are up-to-date.",
      },
      {
        question: "What is DGPS, and how is it used in boundary surveys?",
        answer:
          " Differential Global Positioning System (DGPS) is an advanced surveying technique that uses satellite signals and reference stations to determine highly accurate land coordinates. DGPS boundary surveys are known for their precision and are used to mark property boundaries with high accuracy, often to within a few centimeters.",
      },
      {
        question: "Why should I choose DGPS for boundary demarcation?",
        answer:
          "DGPS boundary surveys provide unmatched accuracy and are especially beneficial for large properties, properties with unclear boundaries, or areas with complex topography. DGPS is also crucial for projects that require precise measurements, such as construction planning or government permits.",
      },
      {
        question: "What is the process of a DGPS boundary survey?",
        answer:
          "In a DGPS survey, surveyors use specialized GPS receivers that communicate with reference stations to pinpoint exact coordinates of boundary points. The data collected is processed to create a highly accurate boundary map, which serves as a legal document for defining property limits.",
      },
      {
        question: "How does DGPS compare to manual boundary surveys?",
        answer:
          "While manual boundary surveys use traditional measuring tools, DGPS surveys utilize satellite technology, offering higher precision and greater reliability. DGPS is ideal for properties needing exact measurements and is commonly required in government and legal documentation.",
      },
      {
        question: "Is DGPS boundary surveying legally accepted?",
        answer:
          "Yes, DGPS boundary surveys are widely recognized and accepted in legal contexts. The accuracy of DGPS technology makes it a preferred choice for official boundary determination, particularly in legal disputes, construction projects, and regulatory applications.",
      },
    ],
  },
  {
    topic: "Property Valuation Service FAQs",
    issues: [
      {
        question: "What is property valuation?",
        answer:
          "Property valuation is the process of determining the fair market value of a property based on various factors such as location, size, condition, and market trends.",
      },
      {
        question: "Why do I need a property valuation?",
        answer:
          "A property valuation helps you understand the actual worth of your property, which is essential for selling, buying, legal purposes, taxation, and loan applications.",
      },
      {
        question: "How does Goolok determine the value of my property?",
        answer:
          "Our experts evaluate key factors such as market trends, location, property condition, legal status, and recent transactions in the area to provide an accurate valuation.",
      },
      {
        question: "How long does the property valuation process take?",
        answer:
          "The duration depends on the complexity of the property, but typically, it takes a few days to complete the valuation and provide a detailed report.",
      },
      {
        question: "What documents are required for property valuation?",
        answer:
          "You may need to provide property ownership documents (such as sale deed, patta, or title deed), land measurement details, tax receipts, and any other relevant legal documents.",
      },
      {
        question: "Does Goolok provide an official valuation report?",
        answer:
          "Yes, we provide a detailed valuation report that includes property details, valuation methodology, and the estimated market value.",
      },
      {
        question: "How accurate is the valuation report?",
        answer:
          "Our reports are prepared based on extensive market research and industry standards, ensuring high accuracy and reliability.",
      },
      {
        question:
          "Can I use the valuation report for bank loans or legal matters?",
        answer:
          "Yes, our valuation reports can be used for various purposes, including bank loans, property disputes, taxation, and investment decisions. However, some institutions may require reports from specific government-approved valuers.",
      },
      {
        question: "How much does property valuation cost?",
        answer:
          "The cost depends on the type, size, and location of the property. Contact Goolok for pricing details.",
      },
      {
        question: "How do I request a property valuation from Goolok?",
        answer:
          "You can request a valuation through our website or contact our team for assistance. We will guide you through the process and schedule an evaluation.",
      },
    ],
  },
];

const CustomerCare = () => {
  const [selectedTopic, setSelectedTopic] = useState(faqData[0]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter questions based on search query
  const filteredIssues = selectedTopic.issues.filter((issue) =>
    issue.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* <div className="container profile_edit">
        <div className="row w-100">
          <ProfileSideBar /> */}

      <div style={{ paddingTop: 50, fontFamily: "poppins" }} className="mb-5 container">
        {/* <div>
            <h6>Customer Care</h6>
            <hr />
          </div> */}
        <div>
          <h5 className="text-center" style={{ color: "#36454f" }}>
            Customer Care
          </h5>
          <hr className="hr-gradient" />
        </div>

        {/* Search Box */}
        <div className="mb-3 position-relative d-flex">
          {/* <FaSearch className="position-absolute" style={{ top: "10px", right: "10px", color: "#aaa" }} /> */}
          <input
            type="text"
            className="form-control pl-4"
            placeholder="Search FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ borderRadius: "0px" }}
          />
          <div class="input-group-append" sty>
            <span class="input-group-text" id="searchIcon">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>

        <div className="row">
          {/* Step 1: Select Topic */}
          <div className="col-md-6 col-lg-4 mt-4 ">
            <h5>Step 1: Select Topic </h5>
            <ul className="list-group mt-3">
              {faqData.map((item, index) => (
                <li
                  key={index}
                  className={`list-group-item d-flex justify-content-between align-items-center ${selectedTopic.topic === item.topic ? "active" : ""
                    }`}
                  onClick={() => {
                    setSelectedTopic(item);
                    setSelectedIssue(null);
                    setSearchQuery("");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {item.topic}
                  <FaChevronRight />
                </li>
              ))}
            </ul>
          </div>

          {/* Step 2: Select Issue */}
          <div className="col-md-6 col-lg-4 mt-4">
            <h5>Step 2: Select Issue</h5>
            <ul className="list-group mt-3">
              {filteredIssues.map((issue, index) => (
                <li
                  key={index}
                  className={`list-group-item d-flex justify-content-between align-items-center ${selectedIssue === issue ? "active" : ""
                    }`}
                  onClick={() => setSelectedIssue(issue)}
                  style={{ cursor: "pointer" }}
                >
                  {issue.question}
                  <FaChevronRight />
                </li>
              ))}
              {filteredIssues.length === 0 && (
                <p className="text-muted">No matching results</p>
              )}
            </ul>
          </div>

          {/* Step 3: Get Assistance */}
          <div className="col-md-6 col-lg-4 mt-4">
            <h5 className="mb-3">Step 3: Get Assistance</h5>
            {selectedIssue ? (
              typeof selectedIssue.answer === "string" ? (
                <p>{selectedIssue.answer}</p>
              ) : (
                <div>
                  <h5>{selectedIssue.answer.heading}</h5>
                  <ul>
                    {selectedIssue?.answer?.list?.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )
            ) : (
              <p>Select an issue to see details.</p>
            )}
          </div>
        </div>
      </div>
      {/* </div>
      </div> */}

    </>
  );
};

export default CustomerCare;
