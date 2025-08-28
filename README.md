# AI Finance Platform

## FinSight Ai

## 1. Setting up clerk for SignIn and SignUp
## 2. Buiilding Header component

## 3. Adding Backend to the system

- Added supabase for backend database: configure the new project and pasted the ORMs Prisma database .env.local to the .env file of the app

- Add Arcjet for security bot detection, rate limiting, email validation, attack protection, data redaction.
-- Get the api and paste in Env file

- Add Injest to the app for budget alerts, recalculating the recurring method, financial report using ai

-- run this command: npx inngest-cli@latest dev
 

 ## 4. Building Hero section
 - has used gradient in the title text
 - added scroll animation to the banner image

 ```js
//image div
  <div ref={imageRef} className="hero-image">

  //js code
    const imageRef = useRef();
  useEffect(() => {
    const imageElement = imageRef.current;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

 ```