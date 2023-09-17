import { StockSymbols } from './FriarBuckStocks'

export enum NewsType {
  VERY_BULLISH = 'VERY_BULLISH',
  BULLISH = 'BULLISH',
  NEUTRAL = 'NEUTRAL',
  BEARISH = 'BEARISH',
  VERY_BEARISH = 'VERY_BEARISH',
}

export const NEWS_TEMPLATES = {
  [StockSymbols.CC]: {},
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
