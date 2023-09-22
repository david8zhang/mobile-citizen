import { StockSymbols } from './FriarBuckStocks'

export enum NewsType {
  VERY_BULLISH = 'VERY_BULLISH',
  BULLISH = 'BULLISH',
  NEUTRAL = 'NEUTRAL',
  BEARISH = 'BEARISH',
  VERY_BEARISH = 'VERY_BEARISH',
}

export const NEWS_COMPANIES = ['CBNC', 'Yippee Finance', 'York New Times', 'Wall Street Insider']

export const CLIK_CLOK_NEWS_STORIES = {
  [NewsType.VERY_BEARISH]: [
    {
      headline: 'U.S. Authorities Consider Ban on Clik Clok Amidst Security Concerns',
      text: `Clik Clok, the short-form video sharing company that has taken the world by storm, may be facing a potential ban in the United States as concerns mount over national security implications tied to the platform.

      The U.S. government has been closely scrutinizing Clik Clok in recent months due to fears that the platform could pose a threat to user data security and national interests. While no official ban has been enacted as of yet, the possibility looms large.

      The U.S. government's consideration of a ban on Clik Clok has sent shockwaves through the tech industry. Users and content creators on the platform are uncertain about the fate of their accounts, and investors have expressed concern about the potential impact on the company's stock.

      Clik Clok has responded to these concerns with a pledge to improve data security, enhance content moderation, and ensure transparency in its operations. The company has also proposed discussions with U.S. regulators to address their concerns and avoid a ban.

      The fate of Clik Clok in the United States remains uncertain, but the situation highlights the growing scrutiny and regulatory challenges faced by tech companies in the digital age. As discussions between Clik Clok and U.S. authorities continue, the outcome could have far-reaching implications for both the platform and the broader tech industry.
      `,
    },
    {
      headline: 'Clik Clok Stumbles as Earnings Fall Short of Projections',
      text: `Clik Clok, the popular short-form video sharing company, found itself in a tough spot today as it announced that its quarterly earnings had fallen significantly short of analysts' projections. This disappointing news has sent shockwaves through the tech industry and rattled investors.

      Clik Clok, once seen as a rising star in the social media landscape, has been grappling with mounting competition and evolving user preferences. The company's financial report for the most recent quarter revealed that its revenue and profit margins were substantially lower than anticipated.
      
      Clik Clok's leadership team has acknowledged the challenges it faces and has pledged to take decisive action to address the situation. They are considering various strategies to reignite user growth, enhance advertising offerings, and optimize costs.

      As Clik Clok confronts these headwinds, industry analysts and shareholders are closely monitoring the company's next moves. Whether the short-form video platform can rebound from this setback and meet its future earnings projections remains uncertain. The coming months will be critical for Clik Clok as it strives to regain investor confidence and chart a path towards sustainable growth.`,
    },
  ],
  [NewsType.BEARISH]: [
    {
      headline: 'Clik Clok Narrowly Misses Earnings, Offers Hope for Recovery',
      text: `Clik Clok, the short-form video sharing company, narrowly missed its earnings projections for the latest quarter, but the smaller-than-expected margin has sparked optimism among investors and industry analysts about the company's potential for a swift recovery.

      Clik Clok, which had been facing mounting pressure to meet its earnings targets after a period of stagnant growth, reported revenues that were just shy of analyst expectations. While this marks the company's second consecutive quarter of missed earnings, the narrower gap between projections and actual results has raised hopes that the worst may be behind them.

      Investors initially reacted cautiously to the news, with Clik Clok's stock price dipping slightly. However, a closer look at the financial report revealed some positive trends, including a modest increase in user engagement and a decrease in operating costs.

      Clik Clok's leadership team expressed their commitment to addressing the challenges head-on. They have outlined strategies to reignite user growth, strengthen advertising partnerships, and optimize expenses.

      Market analysts have noted that the company's efforts to close the earnings gap indicate a potential turning point. While Clik Clok still has work ahead to meet investor expectations fully, the improved performance has fueled optimism about the company's ability to adapt to changing market dynamics.

      As Clik Clok charts a path toward recovery and seeks to regain investor confidence, the tech industry is watching closely. Whether the company can sustain its momentum and achieve its next earnings targets will be a focal point of interest for shareholders and industry observers in the coming months.
      `,
    },
    {
      headline: 'Clik Clok Faces Uphill Battle as Growth Slows',
      text: `Clik Clok, the once-booming short-form video sharing platform, is grappling with a challenging period as it experiences a notable slowdown in user growth. This development has raised concerns among investors, casting a shadow on the company's stock price.

      Clik Clok, known for its viral videos and user-generated content, was one of the pioneers in the short-form video industry. However, recent data indicates that the platform's meteoric rise may be leveling off. User engagement and new sign-ups have shown signs of deceleration over the past few quarters, marking a departure from the company's previously exponential growth.
      
      The company's leadership has acknowledged the challenges it faces and has outlined plans to address them. These include improving content moderation, diversifying revenue streams, and exploring strategic partnerships.

      Investors and industry analysts are closely monitoring Clik Clok's efforts to reverse its growth trajectory. Whether the company can reignite user interest and regain its position in the highly competitive short-form video market remains uncertain. As the battle for user attention continues, the future of Clik Clok and its stock price will be closely watched by investors and stakeholders alike.`,
    },
  ],
  [NewsType.NEUTRAL]: [
    {
      headline: 'Shrimptastic Craze Takes Over Clik Clok as Users Go Shellfish for Laughs',
      text: `Move over, cat videos and dance challenges, there's a new sensation taking over Clik Clok, and it's as shrimply hilarious as it gets. The short-form video sharing platform has witnessed an unexpected surge in "shrimp content," leaving users cracking up and wondering if the shrimp invasion is here to stay.

      In what can only be described as a tidal wave of shrimp-related content, Clik Clok users have been sharing short videos featuring everything from miniature shrimp doing interpretive dance to shrimp-themed comedy sketches. It seems that the crustacean charm has captivated the platform's community, with many videos going viral and racking up millions of views.
      
      The trend started innocently enough with a user named @ShrimpyDance, who posted a video of a tiny shrimp shimmying to a catchy tune. The clip quickly gained attention and inspired countless imitators. Soon, Clik Clok was flooded with shrimp-inspired creativity.
      
      Users have embraced the trend with enthusiasm, creating shrimp-centric skits, parodies, and even a few shrimp cooking tutorials for the more adventurous foodies. The hashtag #Shrimptastic has become a viral sensation, with users competing to come up with the wackiest shrimp-related content.
      
      "I never thought I'd say this, but shrimp have become the stars of Clik Clok," said @ShrimpyDance in an interview. "People love the little guys, and it's been a shell of a good time sharing their antics with the world."
      
      Shrimp enthusiasts and comedians are cashing in on the trend, with some even setting up merch shops selling shrimp-themed clothing and accessories. It seems that the shrimp craze is not only entertaining but also economically fruitful for those riding the shrimpy wave.
      
      Clik Clok's leadership is both bemused and amused by the shrimp phenomenon. "We've seen trends come and go, but this one definitely takes the cake, or should I say, the shrimp cocktail," remarked the platform's spokesperson.
      
      While no one knows how long the shrimp content trend will last, one thing is clear: Clik Clok users are having a shell of a time, and the shrimp invasion shows no signs of slowing down. So, if you're in need of a good laugh or just some shrimptastic entertainment, hop on Clik Clok and join the fun!`,
    },
  ],
  [NewsType.BULLISH]: [
    {
      headline:
        'Clik Clok Breathes Sigh of Relief as Privacy Violation Fine Comes in Lower Than Expected',
      text: `Clik Clok, the embattled short-form video sharing company, received a somewhat unexpected reprieve as the fine for its recent user privacy law violations turned out to be smaller than originally anticipated. While the penalty still represents a significant setback, the reduced amount has provided the company with a bit of breathing room.

      Clik Clok had been under scrutiny for alleged breaches of user privacy laws, including unauthorized data collection and sharing user information with third parties. The violations prompted regulatory investigations and calls for substantial fines, but the final judgment handed down was notably lower than initial expectations.

      The fine, which amounted to $150 million, is considered a substantial sum but falls short of the more substantial penalties that had been speculated by privacy advocates and industry observers.

      The company, which has faced a significant public relations crisis in the wake of the privacy scandal, expressed its commitment to rectifying its privacy practices and implementing enhanced data protection measures. Clik Clok's leadership team has also issued a public apology for the privacy lapses.

      Privacy experts and advocates are divided in their responses to the reduced fine. Some argue that it sends a message that privacy violations will not be met with the severity they deserve, while others believe it strikes a balance by holding Clik Clok accountable while allowing the company to continue its efforts to reform its privacy policies.

      As Clik Clok navigates the aftermath of the privacy violation and the associated fine, the company remains under close scrutiny from users, regulators, and the wider tech industry. The incident underscores the ongoing importance of robust data privacy practices in the digital age and the consequences companies face when they fail to meet those standards.
    `,
    },
    {
      headline: 'Clik Clok Surprises Investors with Slightly Better-Than-Expected Earnings',
      text: `In a delightful turn of events, Clik Clok, the popular short-form video sharing company, has exceeded the expectations of investors by reporting slightly higher earnings for the past quarter. The positive news has provided a boost of confidence in the platform's ability to rebound from recent challenges.

      Clik Clok's financial report, released earlier this week, revealed that the company's earnings exceeded analyst projections by a modest margin. While it may not be a dramatic surge, the unexpected improvement has been met with enthusiasm among shareholders and industry experts.
      
      The company had faced scrutiny in recent months due to missed earnings targets and a competitive landscape. However, the slight earnings beat suggests that Clik Clok is making progress in its efforts to recover and adapt to changing market dynamics.

      The positive news has resulted in a modest uptick in Clik Clok's stock price, offering some relief to investors who had weathered uncertainty in recent quarters.

      Clik Clok's leadership team remains cautiously optimistic and committed to implementing strategies aimed at long-term growth and stability. The company continues to work on enhancing user experiences, expanding its advertising offerings, and exploring new revenue streams.

      As Clik Clok navigates the evolving landscape of short-form video sharing, the slight earnings beat is seen as a step in the right direction. The company's ability to sustain this positive momentum will be closely monitored by shareholders and industry observers in the coming quarters, as they anticipate further improvements and innovations in the world of short-form content.
      `,
    },
  ],
  [NewsType.VERY_BULLISH]: [
    {
      headline:
        'Clik Clok Surpasses Earnings Expectations, Shining Bright in the Short-Form Video Industry',
      text: `Clik Clok, the popular short-form video sharing platform, has left investors and industry experts pleasantly surprised by announcing earnings that have beaten expectations for the most recent quarter. The news has fueled optimism about the platform's potential and future growth.

      Clik Clok's financial report, released yesterday, revealed earnings that exceeded analyst projections by a significant margin. The impressive performance comes as a breath of fresh air for the company, which had faced challenges and uncertainty in previous quarters.
      
      Clik Clok's leadership team expressed their gratitude to the platform's dedicated user base and content creators for their role in this success. They also emphasized their commitment to maintaining this positive momentum, vowing to continue investing in innovative features, content quality, and user experiences.

      The positive earnings report has reinforced Clik Clok's position as a formidable player in the short-form video sharing industry. The company's ability to consistently exceed earnings expectations highlights its resilience and adaptability in the highly competitive world of social media and digital content.

      As Clik Clok celebrates this impressive financial milestone, the tech industry will be watching closely to see how the platform leverages this success to further solidify its presence and continue shaping the future of short-form video sharing.`,
    },
    {
      headline:
        'Clik Clok Celebrates Surging User Growth, Expanding Its Reach in the Short-Form Video World',
      text: `Clik Clok, the dynamic short-form video sharing platform, is celebrating a significant milestone as it announces a substantial increase in its user base, reinforcing its status as a prominent player in the world of short-form video content.

      The company's latest report showcases a remarkable 30% surge in active users over the past quarter, marking a resounding success in its ongoing mission to create an engaging and diverse digital community.

      The announcement of this substantial increase in users has reverberated throughout the tech industry, sparking excitement among investors and industry experts alike. The platform's expanding reach presents new opportunities for creators and advertisers, further solidifying its position in the short-form video landscape.

      Clik Clok's leadership team expressed their gratitude to the passionate community of users and content creators who have contributed to this achievement. They also reaffirmed their commitment to fostering an environment of creativity, diversity, and user satisfaction.

      As Clik Clok continues to thrive and connect people through short-form video content, the platform's journey highlights the ever-growing demand for innovative and engaging digital experiences. The company's surge in users reaffirms its role as a leading influencer in the evolving landscape of digital media and short-form content creation.`,
    },
  ],
}

export const NILE_NEWS_STORIES = {
  [NewsType.VERY_BEARISH]: [
    {
      headline: 'Nile, Prominent Online Retailer, Faces Financial Turmoil as Earnings Plummet',
      text: `Nile, the once-thriving online retail giant, is now grappling with a financial crisis as it falls short of earnings expectations, leaving investors and industry experts questioning the company's future.

      For years, Nile had been a dominant player in the e-commerce sector, offering a vast array of products and services to millions of customers worldwide. However, recent financial reports reveal a stark contrast to the company's previous success.
      
      In the most recent quarterly earnings report, Nile reported earnings per share (EPS) significantly below analysts' forecasts, marking the third consecutive quarter of disappointing results. The company's revenue also showed a marked decline, raising concerns about its ability to compete in an increasingly competitive online retail landscape. Industry analysts are divided on whether Nile can reverse its fortunes. Some believe that the company's long-standing reputation and customer loyalty could provide a foundation for recovery. Others, however, point to the deep-seated issues within the company's operations that need immediate attention.

      To address the crisis, Nile's management has announced a series of cost-cutting measures, including staff layoffs and the restructuring of its supply chain operations. Additionally, the company plans to launch a new marketing campaign in an effort to regain lost market share.
      
      As Nile navigates these turbulent waters, shareholders, employees, and the entire e-commerce industry will be closely watching to see if the online retail giant can overcome its earnings woes and once again thrive in a fiercely competitive market.
      
      It remains to be seen whether Nile can successfully weather this financial storm and emerge as a stronger and more resilient player in the online retail industry.`,
    },
    {
      headline:
        'Nile Online Retailer Faces Financial Setback with Major Losses in Virtual Assistant Division',
      text: `Nile, the fictional online retail juggernaut, finds itself in the midst of a financial challenge as it reports significant losses within its once-promising virtual assistant division, sending ripples through the tech industry and raising questions about the company's strategic direction.

      The virtual assistant department at Nile, which was established to develop cutting-edge AI-driven virtual assistants for customer support and e-commerce assistance, has been a central focus of the company's innovation efforts. However, recent financial disclosures indicate that these endeavors have not yielded the expected returns.
      
      In the latest quarterly report, Nile announced substantial losses directly attributed to its virtual assistant division. These losses were primarily due to the high costs associated with research and development, as well as the deployment and maintenance of the virtual assistant technology. The company cited the need for substantial investments in AI and machine learning capabilities as a major contributing factor to the division's financial woes.`,
    },
  ],
  [NewsType.BEARISH]: [
    {
      headline: 'Nile Video Stumbles as Subscriber Numbers Fall Short of Expectations',
      text: `Nile Video, the streaming service subsidiary of the online retail giant Nile, is facing challenges as it reports worse-than-expected subscriber numbers, raising concerns about the platform's competitive position in the crowded streaming market.

      Nile Video had entered the streaming arena with high hopes and aggressive marketing campaigns, leveraging Nile's existing customer base to build a formidable platform. However, recent reports indicate that the streaming service has struggled to meet its subscriber growth targets.

      In the latest quarterly report, Nile announced that Nile Video's subscriber numbers fell short of internal expectations. While the platform continues to attract viewers, the rate of growth has been slower than anticipated. Nile Video's subscriber base is now considerably smaller than that of its major competitors in the streaming industry.`,
    },
    {
      headline:
        'Nile Game Studios Cancels MMO Sensation "Grand Adventure" Amidst Overwhelming Negative Feedback',
      text: `Nile Game Studios, a subsidiary of the online retail titan Nile, has sent shockwaves through the gaming world as it announces the sudden cancellation of its ambitious MMO project, "Grand Adventure," citing overwhelmingly negative user feedback from early alpha tests as the driving force behind the decision.

      "Grand Adventure" had captured the imagination of gamers worldwide with its promise of a vast virtual world filled with epic quests, immersive gameplay, and cutting-edge graphics. However, the dream has now come to a screeching halt as Nile Game Studios grapples with the fallout from unfavorable reactions during alpha testing.
      
      The decision to cancel "Grand Adventure" was made after a comprehensive evaluation of user feedback from the alpha testing phase, which revealed a range of critical issues, including gameplay mechanics, server stability, and a perceived lack of innovation. Nile Game Studios expressed deep regret over the disappointment this cancellation may bring to the gaming community.
      
      In a press release, Nile Game Studios stated, "We deeply appreciate the passion and enthusiasm of our gaming community and acknowledge their invaluable feedback during the alpha testing phase of 'Grand Adventure.' Unfortunately, the project faced significant challenges that hindered our ability to deliver the high-quality experience we had envisioned."
      
      The cancellation of "Grand Adventure" is a significant blow to Nile Game Studios, which had pinned high hopes on the MMO game to establish a strong foothold in the competitive gaming industry. Many gamers had eagerly anticipated the title as a potential game-changer in the MMO genre.
      
      Reactions to the cancellation have been mixed, with some gamers expressing understanding of the studio's decision given the negative feedback, while others voiced frustration and disappointment over the sudden end to a game they had eagerly awaited.
      
      Industry analysts are now speculating on the impact of this cancellation on Nile Game Studios' reputation and future gaming endeavors. The studio, previously seen as a rising star in the gaming industry, now faces the challenge of regaining trust and confidence from the gaming community.
      
      Nile Game Studios has indicated that it remains committed to delivering engaging gaming experiences and will continue to invest in game development. The studio plans to learn from the "Grand Adventure" experience and channel its resources into future projects.
      
      As Nile Game Studios reevaluates its gaming strategies and regroups after the cancellation of "Grand Adventure," gamers and industry observers will be watching closely to see how the studio aims to bounce back in the fiercely competitive gaming market.`,
    },
  ],
  [NewsType.NEUTRAL]: [
    {
      headline: 'Brave Nile Delivery Driver Fends Off Mountain Lion in Daring Encounter',
      text: `n a harrowing incident that has captivated the nation, a Nile delivery driver displayed remarkable courage as he fought off a wild mountain lion while on duty, underscoring the unexpected challenges that come with delivering packages in rural and wildlife-rich areas.

      The dramatic encounter occurred when John Davis, a dedicated Nile delivery driver, was on his route in a remote mountainous region. As Davis approached a residence to make a delivery, he noticed a mountain lion lurking nearby. The big cat, startled by Davis's presence, became aggressive and moved closer.
      
      In a split-second decision, Davis, who had received safety training from Nile, acted swiftly and resolutely to defend himself. Armed only with a can of bear spray, he managed to fend off the mountain lion, spraying it in the face and causing the startled animal to retreat.
      
      Davis's quick thinking and bravery saved him from potential harm, and he emerged from the encounter with only minor injuries, primarily scratches and bruises. He immediately contacted local authorities to report the incident, ensuring that wildlife officials could assess the situation and protect the surrounding community.
      
      Nile, the online retail giant, commended Davis for his heroic actions and emphasized the safety measures and training it provides to its delivery personnel. In a statement, Nile stated, "The safety of our employees is our top priority. We are incredibly proud of John's courage and quick response during this unexpected encounter."
      
      The incident serves as a stark reminder of the challenges faced by delivery drivers, particularly those delivering to remote and rural areas where encounters with wildlife can be a real risk. Nile, like other delivery companies, places great importance on ensuring the safety of its employees and provides training to help them navigate various scenarios they may encounter on the job.
      
      Wildlife experts have noted that mountain lion encounters in such areas are relatively rare, but they can happen. They advise individuals in similar situations to remain calm, make themselves appear larger, and use any available deterrents, such as bear spray, as a last resort.
      
      John Davis's bravery in the face of danger has earned him widespread admiration, and his story serves as a testament to the resilience and determination of those who work in the delivery industry, especially in challenging environments.`,
    },
    {
      headline:
        'Nile, Leading Online Retailer, Takes Bold Step to Erase Carbon Emissions, Aims for Net Zero by 2040',
      text: `Nile, a prominent online retailer known for its commitment to innovation, has made an extraordinary commitment to combat climate change by pledging to eliminate carbon emissions from its operations, aiming for net-zero emissions by 2040. This forward-looking sustainability initiative marks a significant stride toward a greener future within the e-commerce industry.

      Nile's carbon emissions reduction plan is an encompassing strategy aimed at tackling emissions at their source and implementing comprehensive sustainability measures across its entire supply chain.
      
      The announcement has garnered enthusiastic support from environmental organizations, climate activists, and customers alike. Nile's pledge aligns with global efforts to combat climate change and showcases the influence of corporations in driving positive change.

      Nile's determination to reach net-zero carbon emissions by 2040 places it at the forefront of sustainability initiatives in the e-commerce sector. The company's commitment serves as an exemplary model for reducing the environmental impact of online retail and demonstrates the influential role businesses can play in addressing critical environmental challenges.
      
      As Nile embarks on its journey toward a carbon-neutral future, the world will be closely watching the company's progress. Nile's pledge represents a monumental step toward a more sustainable and environmentally responsible business model, inspiring hope and setting a commendable example for sustainability within the industry.`,
    },
    {
      headline: 'Nile Unveils Cutting-Edge Drone Delivery Service, Revolutionizing Online Shopping',
      text: `Nile, the pioneering online retailer, has officially entered a new era of e-commerce by announcing the launch of its cutting-edge drone delivery service. With this innovative move, Nile aims to reshape the way customers receive their online orders, offering a faster, more eco-friendly, and highly convenient delivery experience.

      The introduction of Nile's drone delivery service signifies a monumental step forward in the e-commerce industry, as the company harnesses the latest advancements in drone technology to offer a unique and efficient delivery solution.
      
      To ensure the safe and efficient deployment of its drone fleet, Nile has invested in state-of-the-art technology, including advanced navigation systems, obstacle avoidance mechanisms, and comprehensive safety protocols. The company is also collaborating with local authorities and aviation agencies to comply with regulations and maintain the highest standards of safety.

      The announcement of Nile's drone delivery service has generated widespread excitement among customers, technology enthusiasts, and industry experts. Many anticipate that this innovative approach will set new industry standards and inspire other companies to explore similar delivery solutions.
      
      As Nile's cutting-edge drone delivery service takes flight, it promises to redefine the online shopping experience, offering customers unprecedented speed, efficiency, and environmental responsibility. The future of e-commerce has arrived, and Nile is at the forefront of this exciting transformation.`,
    },
  ],
  [NewsType.BULLISH]: [
    {
      headline: `Nile's Strategic Product Announcements Boost Investor Confidence in Web Services Division`,
      text: `Nile, the influential online retailer, has witnessed a surge in investor confidence following a series of strategic product announcements in its rapidly expanding Web Services Division. The company's forward-thinking approach to diversifying its offerings has resonated with investors, indicating a promising future for Nile's technological ventures.

      Nile's recent product announcements have underscored the company's commitment to innovation and its desire to leverage its technological expertise beyond traditional e-commerce. The Web Services Division, responsible for developing and managing cloud-based solutions and applications, has unveiled several key offerings that have piqued investor interest. 
      
      Nile's strategic expansion into web services aligns with broader industry trends, where the demand for cloud-based solutions and data-driven insights is steadily rising. The company's proven track record of delivering exceptional customer experiences and its strong brand reputation give investors added confidence in its ability to excel in this new venture.

      As investor confidence in Nile continues to soar, the company's journey into web services represents a strategic evolution that could reshape its future and solidify its position as a tech-savvy industry leader. The positive response to these key product announcements underscores Nile's potential to diversify and excel in the dynamic landscape of digital services.`,
    },
    {
      headline: 'Nile Stages Remarkable Comeback: Bounces Back from Challenging Financial Quarter',
      text: `Nile, the renowned online retailer, has demonstrated extraordinary resilience and strategic prowess as it successfully navigates a significant turnaround following a challenging financial quarter. The company's ability to bounce back from adversity highlights its commitment to adaptability and innovation in the ever-evolving e-commerce landscape.

      Nile's recent financial quarter had presented a set of unexpected challenges, including disruptions in supply chains, increased competition, and shifts in consumer spending patterns. However, the company's response to these challenges has been nothing short of remarkable.
      
      As Nile celebrates its remarkable comeback, the company is well-positioned to capitalize on its newfound momentum and set new industry standards in the competitive e-commerce sector. The turnaround serves as a reminder of the resilience and adaptability that define Nile's corporate ethos and its determination to thrive in an ever-changing business landscape.`,
    },
  ],
  [NewsType.VERY_BULLISH]: [
    {
      headline:
        'Nile Online Retailer Surpasses Earnings Expectations, Reflecting Remarkable Growth',
      text: `Nile, the renowned online retailer, has reported a spectacular quarter, exceeding earnings expectations and demonstrating remarkable growth that has captivated investors and industry analysts alike. The company's robust financial performance reflects its continued ascent in the competitive e-commerce landscape.

      Nile's latest earnings report, released today, revealed earnings per share (EPS) and revenue figures that surpassed even the most optimistic forecasts. This surge in earnings can be attributed to several key factors that have propelled Nile to new heights in the online retail sector. 
      
      Nile's earnings exceed expectations not only showcase its financial strength but also underscore the resilience and adaptability of the e-commerce sector as a whole. The online retailer's remarkable growth serves as a testament to the increasing importance of e-commerce in the modern retail landscape and its ability to thrive in dynamic and challenging market conditions.

      As Nile continues to exceed earnings expectations and shape the future of online retail, the company's success story remains a source of inspiration for both industry peers and consumers alike. With its commitment to innovation and customer satisfaction, Nile is well-positioned to maintain its upward trajectory in the world of e-commerce.
      `,
    },
    {
      headline: `Nile's Video Streaming Platform Sees Explosive Growth: Subscriber Numbers Skyrocket`,
      text: `Nile, the renowned online retailer, is celebrating a major triumph as its subsidiary, Nile Video, announces a significant surge in subscriber numbers. The remarkable increase in subscribers highlights Nile Video's growing influence in the competitive world of video streaming platforms.

      Nile Video, a streaming platform known for its diverse content library and user-friendly interface, has experienced explosive growth in recent months. The company's latest subscriber numbers reveal an impressive increase, far exceeding expectations and solidifying its position as a formidable player in the streaming industry. 
      
      The surge in Nile Video's subscribers has drawn attention from industry analysts, who recognize the platform's potential to challenge established streaming giants. The company's ability to adapt to changing viewer preferences and its focus on content quality have been cited as contributing factors to its rapid growth.

      As Nile Video continues to expand its content library and enhance its user experience, it aims to attract an even broader audience and cement its status as a prominent player in the competitive streaming landscape.
      
      The substantial increase in subscribers marks a significant milestone for Nile Video and reaffirms the company's commitment to providing top-notch streaming services to its customers. With its growing subscriber base and continued dedication to innovation, Nile Video is poised for an exciting future in the world of online streaming.`,
    },
  ],
}

export const DASH_NEWS_STORIES = {
  [NewsType.VERY_BEARISH]: [
    {
      headline: 'Investor Confidence Plummets as DashEats Reports Weak Earnings in Latest Call',
      text: '',
    },
    {
      headline: 'Investors Skeptical as DashEats Grapples with Profitability Challenges',
      text: '',
    },
    {
      headline: 'DashEats Stock Takes a Hit Amidst Increasing Operating Costs',
      text: '',
    },
  ],
  [NewsType.BEARISH]: [
    {
      headline: 'DashEats Faces Financial Setback as Earnings Fall Short of Expectations',
      text: '',
    },
    {
      headline: 'Investor Caution Grows as DashEats Faces Intense Competition in Grocery Delivery',
      text: '',
    },
    { headline: 'DashEats Grapples with Increased Delivery Times Amid High Demand', text: '' },
    { headline: 'Customer Complaints Rise as DashEats Expands Delivery Coverage', text: '' },
    { headline: 'DashEats Faces Growing Pains in Scaling Operations', text: '' },
    { headline: 'Quality Control Concerns Surface for DashEats', text: '' },
    { headline: 'DashEats Acknowledges Need for Improved Order Accuracy', text: '' },
    { headline: 'Competitive Pressure Squeezes DashEats Margins', text: '' },
    { headline: 'DashEats Encounters Technical Glitches Affecting User Experience', text: '' },
    { headline: 'Customers Express Frustration over Limited Menu Options on DashEats', text: '' },
    {
      headline:
        'DashEats Confronts Challenges in Balancing Delivery Fees and Customer Satisfaction',
      text: '',
    },
    { headline: 'DashEats Grapples with Delivery Delays in Peak Hours', text: '' },
  ],
  [NewsType.NEUTRAL]: [
    { headline: "DashEats Introduces 'Mystery Meal Monday' – Surprise Your Taste Buds!", text: '' },
    { headline: 'DashEats Delivers Your Dinner via Rollercoaster for Thrill-seekers', text: '' },
    { headline: "Order from the Future: DashEats Now Offers Time-Traveler's Menu", text: '' },
    {
      headline: "DashEats' 'Alien Appetizers' – Extraterrestrial Flavors at Your Doorstep",
      text: '',
    },
    { headline: 'Dino-Dining Delights: DashEats Offers Prehistoric Paleo Plates', text: '' },
    { headline: "DashEats Launches 'Edible Art' – Get a Picasso on Your Plate!", text: '' },
    { headline: 'Foodie Fortune-Telling: DashEats Offers Psychic Menu Predictions', text: '' },
    { headline: "Surreal Suppers: DashEats' Dream-Inspired Dishes Delivered to You", text: '' },
    { headline: "Experience the Upside-Down: DashEats' 'Stranger Things' Menu", text: '' },
    { headline: 'Bite into the Future: DashEats Introduces 3D-Printed Edible Creations', text: '' },
    { headline: 'DashEats Expands to New Cities, Offering More Food Choices', text: '' },
    { headline: 'DashEats Partners with Local Restaurants to Boost Culinary Variety', text: '' },
    { headline: 'DashEats Introduces Contactless Delivery Options for Safety', text: '' },
    { headline: 'New DashEats App Update Enhances User Experience', text: '' },
    { headline: 'DashEats Celebrates Milestone: One Million Orders Delivered', text: '' },
    { headline: "DashEats Launches 'Eats Pass' Subscription for Exclusive Benefits", text: '' },
    { headline: 'DashEats Donates Meals to Frontline Workers During Pandemic', text: '' },
    { headline: 'Innovation at Its Finest: DashEats Tests Drone Food Deliveries', text: '' },
    {
      headline: "DashEats Announces 'Green Delivery' Initiative to Reduce Carbon Footprint",
      text: '',
    },
    {
      headline: 'DashEats Unveils Partnership with Celebrity Chef for Gourmet Offerings',
      text: '',
    },
  ],
  [NewsType.BULLISH]: [
    { headline: 'DashEats Stock Shows Resilience in Competitive Food Delivery Market', text: '' },
    { headline: "Investors Find Encouragement in DashEats' Consistent Revenue Growth", text: '' },
    {
      headline: 'DashEats Surpasses Quarterly Projections, Attracts Investor Confidence',
      text: '',
    },
    { headline: "Investors Applaud DashEats' Expansion into Lucrative Urban Markets", text: '' },
    { headline: 'DashEats Reports Strong User Retention, Bolstering Investor Sentiment', text: '' },
    { headline: 'Positive User Reviews Boost DashEats Stock Amidst Market Challenges', text: '' },
    { headline: 'DashEats Announces New Partnership Deals, Inspiring Investor Optimism', text: '' },
    { headline: "Investors Embrace DashEats' Efforts to Enhance Customer Experience", text: '' },
    { headline: 'DashEats Focus on Sustainability Gains Favorable Investor Attention', text: '' },
    { headline: 'DashEats Stock Sees Incremental Gains, Reflecting Market Stability', text: '' },
  ],
  [NewsType.VERY_BULLISH]: [
    {
      headline: 'DashEats Soars to New Heights as Quarterly Earnings Exceed Expectations',
      text: '',
    },
    { headline: 'Investor Enthusiasm Soars as DashEats Stock Hits All-Time High', text: '' },
    { headline: 'DashEats Delivers Impressive Growth, Fueled by User Surge', text: '' },
    {
      headline: 'Market Applauds DashEats for Leading in Innovation and Customer Satisfaction',
      text: '',
    },
    { headline: 'Record-Breaking Quarter Propels DashEats to Industry Leadership', text: '' },
    {
      headline: 'DashEats Emerges as a Top Pick for Investors with Exceptional Performance',
      text: '',
    },
    {
      headline: 'Investor Confidence Skyrockets as DashEats Achieves Remarkable Profit Margins',
      text: '',
    },
    {
      headline: 'DashEats Garners Praise for Sustainable Practices and Strong Financials',
      text: '',
    },
    { headline: 'DashEats Becomes a Wall Street Darling with Unstoppable Growth', text: '' },
    {
      headline: 'Investors Flock to DashEats as Company Sets the Bar for E-commerce Success',
      text: '',
    },
  ],
}

export const SPORT_NEWS_STORIES = {
  [NewsType.VERY_BEARISH]: [
    { headline: 'SportiCash Faces Mounting Legal Troubles Amidst Regulatory Scrutiny', text: '' },
    { headline: 'Customers Cry Foul as SportiCash Withholds Payouts', text: '' },
    { headline: 'Financial Woes Plague SportiCash: Stock Price in Freefall', text: '' },
    { headline: 'SportiCash Accused of Manipulating Odds to the Detriment of Bettors', text: '' },
    { headline: 'Scandal Erupts: SportiCash Involved in Money Laundering Probe', text: '' },
    { headline: "SportiCash's Shady Practices Under Investigation by Authorities", text: '' },
    { headline: 'Sports Bettors Beware: SportiCash Accused of Rigging Bets', text: '' },
    { headline: 'Investors Abandon Ship as SportiCash Faces Impending Lawsuits', text: '' },
    { headline: "SportiCash's Reputation in Tatters as Trust Erodes Among Users", text: '' },
    { headline: 'SportiCash CEO Resigns Amid Controversy and Plummeting Stock Value', text: '' },
  ],
  [NewsType.BEARISH]: [
    { headline: 'SportiCash Faces Criticism for Complex Betting Terms and Conditions', text: '' },
    {
      headline: "Users Express Concerns Over SportiCash's Customer Support Responsiveness",
      text: '',
    },
    { headline: 'Bettors Raise Questions About Transparency in SportiCash Odds', text: '' },
    { headline: 'Sports Bettors Report Minor Payment Delays on SportiCash Platform', text: '' },
    { headline: "Competitive Market Challenges SportiCash's Market Share Growth", text: '' },
    { headline: 'SportiCash Grapples with User Complaints Over Interface Usability', text: '' },
    { headline: 'Investor Caution: SportiCash Struggles to Maintain Steady Growth', text: '' },
    { headline: 'SportiCash Faces Regulatory Compliance Challenges in Multiple Regions', text: '' },
    { headline: 'User Reviews Highlight Minor Technical Glitches on SportiCash', text: '' },
    { headline: 'SportiCash Experiences Temporary Downtime, Frustrating Some Bettors', text: '' },
  ],
  [NewsType.NEUTRAL]: [
    {
      headline: 'SportiCash Launches Innovative Mobile Betting App for On-the-Go Wagers',
      text: '',
    },
    { headline: 'SportiCash Announces Sponsorship Deal with Major Sports League', text: '' },
    { headline: 'SportiCash Surpasses One Million Registered Users Milestone', text: '' },
    {
      headline: 'New User-Friendly Features Make Betting on SportiCash Easier Than Ever',
      text: '',
    },
    { headline: 'SportiCash to Host Exciting Virtual Sports Betting Tournament', text: '' },
    {
      headline: 'Industry Experts Analyze the Impact of SportiCash on Online Betting Trends',
      text: '',
    },
    {
      headline: "SportiCash's Charity Betting Campaign Raises Funds for Local Communities",
      text: '',
    },
    { headline: 'SportiCash Unveils Enhanced Security Measures to Protect User Data', text: '' },
    { headline: 'SportiCash Launches Fantasy Sports Integration for Added Excitement', text: '' },
    { headline: 'SportiCash Celebrates Anniversary with Exclusive Promotions for Users', text: '' },
  ],
  [NewsType.BULLISH]: [
    {
      headline: 'SportiCash Enhances User Experience with Streamlined Betting Interface',
      text: '',
    },
    { headline: 'SportiCash Surpasses Industry Average in Payout Rates', text: '' },
    { headline: 'Bettors Praise SportiCash for Competitive Betting Odds', text: '' },
    { headline: 'SportiCash Offers Attractive Bonuses to Reward Loyal Users', text: '' },
    { headline: "User Feedback Drives SportiCash's Ongoing Platform Improvements", text: '' },
    { headline: 'SportiCash Promotes Responsible Gambling with Comprehensive Resources', text: '' },
    { headline: "Bettors Find Value in SportiCash's Diverse Betting Markets", text: '' },
    { headline: 'SportiCash Boosts Customer Satisfaction with Responsive Support Team', text: '' },
    { headline: 'Sports Fans Embrace SportiCash as a Leading Betting Destination', text: '' },
    {
      headline: "Investors Acknowledge SportiCash's Steady Growth in Competitive Market",
      text: '',
    },
  ],
  [NewsType.VERY_BULLISH]: [
    { headline: 'SportiCash Achieves Record Profits with Unprecedented User Engagement', text: '' },
    {
      headline: "SportiCash's Transparency and Fair Play Earns High Praise from Bettors",
      text: '',
    },
    {
      headline: 'Investor Confidence Soars as SportiCash Dominates Online Betting Market',
      text: '',
    },
    { headline: 'SportiCash Leads Industry with Cutting-Edge Technology and Innovation', text: '' },
    { headline: "Bettors Celebrate Big Wins Thanks to SportiCash's Generous Payouts", text: '' },
    { headline: 'SportiCash Breaks New Ground with Revolutionary Betting Features', text: '' },
    {
      headline: 'SportiCash Earns Industry Awards for Outstanding Customer Satisfaction',
      text: '',
    },
    { headline: 'User Reviews Showcase SportiCash as the Premier Betting Destination', text: '' },
    {
      headline: "SportiCash's Charitable Initiatives Positively Impact Local Communities",
      text: '',
    },
    {
      headline: 'Global Expansion: SportiCash Becomes the Preferred Choice for Bettors Worldwide',
      text: '',
    },
  ],
}

export const BANK_NEWS_STORIES = {
  [NewsType.VERY_BULLISH]: [
    {
      headline: 'Bank Corporation Stock Soars to All-Time High on Strong Financial Performance',
      text: '',
    },
    {
      headline: 'Investor Confidence Skyrockets as Bank Corporation Reports Record Earnings',
      text: '',
    },
    {
      headline: "Bank Corporation's Strategic Growth Initiatives Pay Off, Impressing Shareholders",
      text: '',
    },
    { headline: 'Market Applauds Bank Corporation for Exceptional Asset Management', text: '' },
    {
      headline: 'Bank Corporation Recognized as a Top Performer in the Financial Sector',
      text: '',
    },
    { headline: 'Investors Cheer as Bank Corporation Expands Its Global Footprint', text: '' },
    {
      headline: "Bank Corporation's Leadership in Ethical Banking Resonates with Investors",
      text: '',
    },
    { headline: 'Record Dividends for Shareholders as Bank Corporation Thrives', text: '' },
    {
      headline: "Bank Corporation's Innovative Digital Services Attract Strong Investor Interest",
      text: '',
    },
    {
      headline: "Positive Outlook: Analysts Bullish on Bank Corporation's Future Prospects",
      text: '',
    },
  ],
  [NewsType.BULLISH]: [
    { headline: 'Bank Corporation Demonstrates Resilience Amidst Market Challenges', text: '' },
    { headline: 'Steady Performance Positions Bank Corporation as a Solid Investment', text: '' },
    { headline: "Bank Corporation's Diversification Strategy Shows Promise", text: '' },
    {
      headline: 'Investor Confidence Holds Steady as Bank Corporation Navigates Volatile Markets',
      text: '',
    },
    {
      headline: 'Bank Corporation Highlights Commitment to Responsible Banking Practices',
      text: '',
    },
    {
      headline: 'Positive Momentum: Bank Corporation Gains Ground in Competitive Banking Sector',
      text: '',
    },
    { headline: 'Bank Corporation Delivers Steady Returns for Shareholders', text: '' },
    {
      headline: "Investors Find Comfort in Bank Corporation's Consistent Dividend Payouts",
      text: '',
    },
    {
      headline: "Bank Corporation's Robust Risk Management Practices Earn Investor Trust",
      text: '',
    },
    { headline: "Bank Corporation's Long-Term Vision Receives Investor Endorsement", text: '' },
  ],
  [NewsType.NEUTRAL]: [
    {
      headline: 'Bank Corporation Launches Financial Literacy Program for Local Schools',
      text: '',
    },
    {
      headline:
        'Bank Corporation Celebrates Milestone Anniversary with Customer Appreciation Event',
      text: '',
    },
    {
      headline: 'Bank Corporation Invests in Cutting-Edge Cybersecurity to Protect Customers',
      text: '',
    },
    { headline: "Bank Corporation Named 'Employer of Choice' for Workplace Excellence", text: '' },
    {
      headline: 'Bank Corporation Donates Generously to Local Charities in Annual Giving Drive',
      text: '',
    },
    {
      headline: 'Bank Corporation Introduces New Mobile App Features for Enhanced Banking',
      text: '',
    },
    {
      headline:
        "Bank Corporation's CEO Shares Insights on Future of Banking at Industry Conference",
      text: '',
    },
    {
      headline: "Bank Corporation's Community Engagement Efforts Lauded by Civic Leaders",
      text: '',
    },
    { headline: 'Bank Corporation Expands Mortgage Offerings to Support Homebuyers', text: '' },
    {
      headline: 'Bank Corporation Launches Green Banking Initiative for Sustainable Finance',
      text: '',
    },
    { headline: 'Bank Corporation Releases Quarterly Financial Report', text: '' },
    { headline: 'Bank Corporation Announces Board of Directors Reshuffle', text: '' },
    { headline: 'Bank Corporation Expands Branch Network into New Region', text: '' },
    { headline: 'Bank Corporation to Host Financial Wellness Webinar Series', text: '' },
    {
      headline: 'Bank Corporation Updates Online Banking Platform for Improved User Experience',
      text: '',
    },
    { headline: 'Bank Corporation Launches Small Business Loan Program', text: '' },
    {
      headline: 'Bank Corporation Partners with Local Nonprofits for Community Outreach',
      text: '',
    },
    { headline: "Bank Corporation's Economic Forecast Indicates Stable Growth", text: '' },
    { headline: 'Bank Corporation Names New Chief Financial Officer', text: '' },
    {
      headline: 'Bank Corporation Sponsors Financial Literacy Seminar for Local Students',
      text: '',
    },
  ],
  [NewsType.BEARISH]: [
    { headline: 'Bank Corporation Faces Regulatory Scrutiny Over Compliance Concerns', text: '' },
    {
      headline: 'Investor Skepticism Persists as Bank Corporation Reports Modest Earnings',
      text: '',
    },
    { headline: "Market Reacts Cautiously to Bank Corporation's Restructuring Plan", text: '' },
    { headline: "Bank Corporation's Stock Value Dips Amidst Industry-wide Challenges", text: '' },
    {
      headline: 'Analysts Express Concerns Over Rising Operating Costs at Bank Corporation',
      text: '',
    },
    {
      headline: 'Investor Confidence Wanes as Bank Corporation Grapples with Loan Delinquencies',
      text: '',
    },
    {
      headline: "Bank Corporation's Stock Price Affected by Global Economic Uncertainty",
      text: '',
    },
    { headline: 'Bank Corporation Reports Marginally Lower Quarterly Profits', text: '' },
    {
      headline: "Challenging Market Conditions Impact Bank Corporation's Growth Prospects",
      text: '',
    },
    {
      headline: 'Bank Corporation Acknowledges Customer Complaints Regarding Service Quality',
      text: '',
    },
  ],
  [NewsType.VERY_BEARISH]: [
    { headline: "Bank Corporation's Stock Plummets Amidst Mounting Financial Woes", text: '' },
    { headline: 'Investors Abandon Ship as Bank Corporation Faces Impending Default', text: '' },
    {
      headline: "Regulatory Investigations Cast a Dark Cloud Over Bank Corporation's Future",
      text: '',
    },
    { headline: 'Market Panic as Bank Corporation Reports Significant Losses', text: '' },
    { headline: "Bank Corporation's Leadership Crisis Triggers Investor Mass Exodus", text: '' },
    { headline: 'Credit Downgrade Looms for Bank Corporation Due to High Default Risk', text: '' },
    { headline: "Bank Corporation's Troubled Assets Raise Concerns Among Shareholders", text: '' },
    { headline: 'Investor Confidence in Bank Corporation at an All-Time Low', text: '' },
    { headline: "Bank Corporation's Scandal Unveiled: CEO Resigns Amidst Controversy", text: '' },
    { headline: 'Bank Corporation Faces Potential Bankruptcy as Debt Piles Up', text: '' },
  ],
}

export const BOOG_NEWS_STORIES = {
  [NewsType.VERY_BULLISH]: [
    { headline: 'Boogle Stock Skyrockets to Record High Amid Strong Earnings', text: '' },
    { headline: 'Investors Thrilled as Boogle Reports Double-Digit Revenue Growth', text: '' },
    { headline: "Boogle's Innovative AI Search Technology Attracts Investor Enthusiasm", text: '' },
    { headline: "Market Applauds Boogle's Commitment to Ethical Data Handling", text: '' },
    { headline: "Boogle's Global Expansion Sparks Investor Confidence", text: '' },
    { headline: "Boogle's Founders Announce Bold Plans for Future Growth", text: '' },
    {
      headline: 'Boogle Achieves Top Sustainability Rankings, Drawing Investor Interest',
      text: '',
    },
    { headline: "Boogle's Cloud Services Division Flourishes, Boosting Stock Value", text: '' },
    { headline: "Boogle's Strong User Growth Boosts Investor Sentiment", text: '' },
    { headline: "Boogle's Diverse Product Portfolio Positions It as a Tech Powerhouse", text: '' },
  ],
  [NewsType.BULLISH]: [
    { headline: 'Boogle Stock Shows Resilience Amidst Market Volatility', text: '' },
    { headline: "Investors Find Confidence in Boogle's Consistent Performance", text: '' },
    { headline: "Boogle's Focus on User Privacy Wins Praise from Shareholders", text: '' },
    { headline: "Boogle's Responsible Data Practices Attract Ethical Investment", text: '' },
    { headline: 'Investor Interest Grows as Boogle Expands its Product Ecosystem', text: '' },
    { headline: "Boogle's CEO Optimistic About Future Prospects, Reassures Investors", text: '' },
    { headline: "Boogle's Sustainability Initiatives Align with ESG Investment Trends", text: '' },
    { headline: 'User Satisfaction Drives Steady Growth for Boogle', text: '' },
    { headline: "Investors Acknowledge Boogle's Strong Brand and Market Presence", text: '' },
    { headline: "Boogle's Long-Term Vision Aims for Sustainable Growth", text: '' },
  ],
  [NewsType.NEUTRAL]: [
    { headline: 'Boogle Announces Major Algorithm Update for Enhanced Search Results', text: '' },
    {
      headline: "Boogle's Virtual Reality Project Promises a Revolution in Online Interaction",
      text: '',
    },
    { headline: 'Boogle Partners with Leading Universities to Advance AI Research', text: '' },
    {
      headline: "Boogle's 'Green Data Centers' to Set New Standards in Sustainable Tech",
      text: '',
    },
    { headline: 'Boogle Reveals Plans to Invest Billions in Rural Internet Access', text: '' },
    { headline: "Boogle's Quarterly Earnings Report Reflects Steady Growth", text: '' },
    { headline: 'Boogle Acquires Prominent Augmented Reality Startup', text: '' },
    { headline: "Boogle Launches 'Boogle for Good' Initiative to Empower Nonprofits", text: '' },
    { headline: "Boogle's CEO Shares Vision for the Future of Online Search", text: '' },
    { headline: "Boogle's Campus Expansion to Foster Innovation and Collaboration", text: '' },
  ],
  [NewsType.BEARISH]: [
    { headline: 'Boogle Stock Faces Mild Downturn Amid Market Volatility', text: '' },
    { headline: 'Investors Exercise Caution as Boogle Reports Modest Earnings Growth', text: '' },
    { headline: "Boogle's Privacy Policies Under Scrutiny, Raising Investor Concerns", text: '' },
    { headline: 'Boogle Encounters Regulatory Challenges in International Markets', text: '' },
    { headline: "Market Reacts Cautiously to Boogle's Expansion Plans", text: '' },
    {
      headline: 'Boogle Acknowledges Minor User Data Breach, Affects Investor Sentiment',
      text: '',
    },
    { headline: "Investors Monitor Boogle's Growing Competition in Search Industry", text: '' },
    { headline: "Boogle's CEO Faces Criticism Over Controversial Statements", text: '' },
    { headline: 'Boogle Stock Shows Marginal Dip in Response to Economic Uncertainty', text: '' },
    {
      headline: "Investors Express Worry About Boogle's Heavy Reliance on Advertising Revenue",
      text: '',
    },
  ],
  [NewsType.VERY_BEARISH]: [
    { headline: 'Boogle Stock Plummets as Earnings Fall Well Below Expectations', text: '' },
    { headline: 'Investors Abandon Ship as Boogle Faces a Severe Data Breach Scandal', text: '' },
    { headline: "Boogle's Revenue Forecast Sends Shockwaves Through the Market", text: '' },
    { headline: "Boogle's CEO Resigns Amidst Mounting Controversies and Stock Sell-Off", text: '' },
    { headline: 'Regulatory Crackdown Looms Large Over Troubled Boogle', text: '' },
    { headline: "Investor Confidence Shattered as Boogle's Privacy Violations Surface", text: '' },
    { headline: "Boogle's Profit Warning Sparks Panic Selling on Wall Street", text: '' },
    { headline: "Boogle's Monopoly Status Threatened by Intensifying Antitrust Probes", text: '' },
    { headline: "Boogle's Stock in Freefall as Advertisers Flee the Platform", text: '' },
    {
      headline: 'Market Experts Predict Bleak Future for Boogle Amidst Growing Scandals',
      text: '',
    },
  ],
}

export const FISH_NEWS_STORIES = {
  [NewsType.VERY_BULLISH]: [
    { headline: 'FishBook Stock Surges to Record Highs on Strong Q3 Earnings', text: '' },
    { headline: 'Investors Celebrate as FishBook Reports Stellar User Growth', text: '' },
    { headline: "FishBook's Cutting-Edge AI Features Delight Users and Shareholders", text: '' },
    { headline: 'Market Optimism Prevails as FishBook Expands into Global Markets', text: '' },
    {
      headline: 'FishBook Earns Industry Accolades for Exceptional Social Media Leadership',
      text: '',
    },
    {
      headline: "FishBook's Philanthropic Initiatives Transform Communities Around the Globe",
      text: '',
    },
    { headline: 'Investor Confidence Soars as FishBook Stock Breaks All Records', text: '' },
    { headline: "FishBook's Robust Monetization Strategies Drive Revenue Growth", text: '' },
    { headline: "Positive Outlook: Analysts Bullish on FishBook's Future Prospects", text: '' },
    {
      headline: 'FishBook Emerges as a Wall Street Darling with Unprecedented Performance',
      text: '',
    },
  ],
  [NewsType.BULLISH]: [
    { headline: 'FishBook Stock Holds Steady Amidst Volatile Market Conditions', text: '' },
    { headline: "Investors Express Confidence in FishBook's Resilience", text: '' },
    { headline: "FishBook's Latest User Features Receive Positive Reception", text: '' },
    { headline: "FishBook's CEO Discusses Promising Growth Prospects", text: '' },
    { headline: 'Steady User Growth Reflects Positively on FishBook', text: '' },
    { headline: "FishBook's Strategic Alliances Generate Investor Interest", text: '' },
    { headline: "Market Experts Analyze FishBook's Role in Social Media Evolution", text: '' },
    { headline: "Investors Recognize FishBook's Strong User Engagement", text: '' },
    { headline: "FishBook's Measures to Combat Misinformation Receive Acknowledgment", text: '' },
    { headline: "FishBook's Long-Term Strategy Aligns with Market Trends", text: '' },
  ],
  [NewsType.NEUTRAL]: [
    { headline: "FishBook Launches New 'Safety Check' Feature for Users", text: '' },
    { headline: "FishBook's CEO Speaks at Tech Conference on Digital Privacy", text: '' },
    { headline: 'FishBook Surpasses One Billion Monthly Active Users Milestone', text: '' },
    { headline: "FishBook Introduces 'Community Voice' Feature to Encourage Dialogue", text: '' },
    { headline: 'FishBook Launches Educational Initiative to Promote Online Literacy', text: '' },
    { headline: 'FishBook Takes Steps to Enhance User Data Protection Measures', text: '' },
    { headline: "FishBook's Virtual Reality Team Teases Exciting Developments", text: '' },
    { headline: 'FishBook Announces Collaboration with Renowned Artist for AR Filters', text: '' },
    { headline: "FishBook's AI Algorithms Improve Content Recommendation Accuracy", text: '' },
    { headline: 'FishBook Celebrates 10th Anniversary with User Appreciation Event', text: '' },
  ],
  [NewsType.BEARISH]: [
    { headline: 'FishBook Stock Shows Minor Downturn Amidst Market Turbulence', text: '' },
    { headline: 'Investors Exercise Caution as FishBook Reports Modest Earnings Growth', text: '' },
    {
      headline: "FishBook's Privacy Practices Under Scrutiny, Raising Investor Concerns",
      text: '',
    },
    { headline: 'FishBook Encounters Regulatory Challenges in International Markets', text: '' },
    { headline: "Market Reacts Cautiously to FishBook's Expansion Plans", text: '' },
    { headline: 'FishBook Acknowledges Minor User Data Security Incident', text: '' },
    { headline: 'Investors Monitor Growing Competition in the Social Media Space', text: '' },
    { headline: "FishBook's CEO Faces Criticism Over Handling of Recent Controversy", text: '' },
    { headline: 'FishBook Stock Shows Marginal Dip in Response to Economic Uncertainty', text: '' },
    { headline: "Investors Express Concern About FishBook's Ad Revenue Challenges", text: '' },
  ],
  [NewsType.VERY_BEARISH]: [
    { headline: 'FishBook Stock Plummets as Earnings Crash Below Expectations', text: '' },
    { headline: 'Investors Panic as FishBook Faces Major Data Breach Scandal', text: '' },
    { headline: "FishBook's Bleak Revenue Forecast Sends Shockwaves Through Market", text: '' },
    { headline: 'FishBook CEO Resigns Amidst Growing Controversies and Stock Collapse', text: '' },
    { headline: 'Regulatory Storm Looms Over FishBook Amid Privacy Violations', text: '' },
    { headline: 'Investor Confidence in FishBook at an All-Time Low', text: '' },
    { headline: "FishBook's Stock Nosedives Amidst Growing Advertiser Boycott", text: '' },
    { headline: 'Market Experts Predict a Grim Future for FishBook Amidst Scandals', text: '' },
    { headline: 'FishBook Faces Massive User Exodus Following Data Privacy Debacle', text: '' },
    { headline: 'Investors Abandon Ship as FishBook Becomes a Wall Street Pariah', text: '' },
  ],
}

export const NEWS_TEMPLATES = {
  [StockSymbols.CC]: CLIK_CLOK_NEWS_STORIES,
  [StockSymbols.NILE]: NILE_NEWS_STORIES,
  [StockSymbols.DASH]: DASH_NEWS_STORIES,
  [StockSymbols.SPORT]: SPORT_NEWS_STORIES,
  [StockSymbols.BANK]: BANK_NEWS_STORIES,
  [StockSymbols.BOOG]: BOOG_NEWS_STORIES,
  [StockSymbols.FISH]: FISH_NEWS_STORIES,
  [StockSymbols.MRHD]: null,
  [StockSymbols.NDFX]: null,
  [StockSymbols.DIDN]: null,
  [StockSymbols.VVDA]: null,
  [StockSymbols.GG]: null,
  [StockSymbols.BRB]: null,
  [StockSymbols.ANC]: null,
}
