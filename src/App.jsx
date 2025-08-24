
import Hero from './section/Hero.jsx'
import {ShowcaseSection} from "./section/ShowcaseSection.jsx";
import NavBar from "./components/NavBar.jsx";
import {FeatureCards} from "./section/FeatureCards.jsx";
import {TechStack} from "./section/TechStack.jsx";
import {Testimonials} from "./section/Testimonials.jsx";
import Contact from "./section/Contact.jsx";
import ContactExperience from "./components/models/contact/ContactExperience.jsx";
import Computer from "./components/models/contact/Computer.jsx";
import Profile from "./components/Profile.jsx";
import { uploadNFTData, uploadContactData } from "./constants/uploadNFT.js";



const App = () => {
    return (
       <>
           <NavBar/>
           <Hero/>
           <ShowcaseSection />
           <FeatureCards/>
          <Profile/>
           <TechStack/>
           <Testimonials/>
           <Contact/>
           <Computer/>
           <ContactExperience/>

       </>

    )
}
const handleNFTUpload = async () => {
  const nftInfo = {
    name: "test nft",
    description: "Handmade Warli painting",
    price: "0.5 ETH",
    creatorWallet: "0x1234567890abcdef"
  };
 

await uploadNFTData(dummyNFT);

  const nftURI = await uploadNFTData(nftInfo);
  console.log("NFT Metadata URI:", nftURI);
};

const handleContactUpload = async () => {
  const contactInfo = {
    name: "Artist Name",
    wallet: "0x123...",
    email: "artist@email.com"
  };

  const contactURI = await uploadContactData(contactInfo);
  console.log("Contact Info URI:", contactURI);
};

export default App

