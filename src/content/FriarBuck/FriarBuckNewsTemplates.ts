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
      text: '',
    },
    {
      headline: 'Clik Clok Stumbles as Earnings Fall Short of Projections',
      text: '',
    },
    { headline: 'Investor Confidence Plummets as ClikClok Faces Content Crisis', text: '' },
    { headline: "ClikClok's Ad Revenue Takes a Nosedive, Raising Red Flags", text: '' },
    {
      headline: 'Regulatory Challenges Mount as ClikClok Grapples with Content Moderation',
      text: '',
    },
    {
      headline: 'Investors Flee as ClikClok Reports Ongoing Losses and Uncertain Future',
      text: '',
    },
    { headline: 'Advertisers Pull Out of ClikClok Amidst Brand Safety Concerns', text: '' },
    { headline: "ClikClok's User Base Shrinks Significantly, Dark Clouds Overhead", text: '' },
    { headline: 'Content Controversies Continue to Plague ClikClok, Stock Prices Sink', text: '' },
    {
      headline: 'Market Experts Predict Tough Times Ahead for ClikClok in Crowded Market',
      text: '',
    },
  ],
  [NewsType.BEARISH]: [
    {
      headline: 'Clik Clok Narrowly Misses Earnings, Offers Hope for Recovery',
      text: '',
    },
    {
      headline: 'Clik Clok Faces Uphill Battle as Growth Slows',
      text: '',
    },
    { headline: 'ClikClok Faces Growing Competition in Crowded Short-Video Market', text: '' },
    { headline: "Investors Show Caution as ClikClok's Growth Rate Slows", text: '' },
    { headline: 'ClikClok Wrestles with Content Moderation Challenges', text: '' },
    { headline: 'ClikClok Grapples with User Data Privacy Concerns', text: '' },
    { headline: 'Regulatory Scrutiny Increases for ClikClok Amidst Expansion', text: '' },
    { headline: "Investors Monitor ClikClok's Struggles to Attract Top Creators", text: '' },
    { headline: 'Advertisers Seek Transparency from ClikClok in Brand Partnerships', text: '' },
    { headline: "ClikClok's User Engagement Plateaus, Impact on Stock Value", text: '' },
    { headline: 'Content Controversies Occasional Headache for ClikClok', text: '' },
    { headline: "Market Uncertainty Affects ClikClok's Growth Trajectory", text: '' },
  ],
  [NewsType.NEUTRAL]: [
    {
      headline: 'Shrimptastic Craze Takes Over Clik Clok as Users Go Shellfish for Laughs',
      text: '',
    },
    {
      headline:
        'ClikClok User Breaks World Record for Most Dance Challenges Attempted in One Hour!',
      text: '',
    },
    {
      headline: "ClikClok Announces New 'Dad Joke Challenge' Trend, World Groans in Anticipation",
      text: '',
    },
    {
      headline: "Local Cat Takes Over ClikClok: Officially Crowned 'Purrfect' Content Creator",
      text: '',
    },
    {
      headline:
        "ClikClok's CEO Attempts Viral 'Coffeemaker Dance' – Results Hilariously Predictable",
      text: '',
    },
    {
      headline: 'ClikClok Influencer Discovers Secret Society of Sock Puppet Enthusiasts',
      text: '',
    },
    {
      headline: "User Claims to Have Found a Portal to the 'Dance Dimension' on ClikClok",
      text: '',
    },
    { headline: "ClikClok User Conducts 'Alien Interview' Series with a Tin Foil Hat", text: '' },
  ],
  [NewsType.BULLISH]: [
    {
      headline:
        'Clik Clok Breathes Sigh of Relief as Privacy Violation Fine Comes in Lower Than Expected',
      text: '',
    },
    {
      headline: 'Clik Clok Surprises Investors with Slightly Better-Than-Expected Earnings',
      text: '',
    },
    { headline: "Investors Remain Optimistic About ClikClok's Potential for Growth", text: '' },
    { headline: 'ClikClok Partners with Charities to Raise Awareness for Social Causes', text: '' },
    { headline: "ClikClok's User Engagement Continues to Show Steady Growth", text: '' },
    { headline: 'Advertisers Recognize ClikClok as a Platform for Authentic Engagement', text: '' },
    { headline: "Content Creators Flourish on ClikClok's Supportive Platform", text: '' },
    { headline: "ClikClok's Long-Term Vision Aligns with Positive Industry Trends", text: '' },
    { headline: 'ClikClok Transforms Lives: Stories of Success from Content Creators', text: '' },
  ],
  [NewsType.VERY_BULLISH]: [
    {
      headline:
        'Clik Clok Surpasses Earnings Expectations, Shining Bright in the Short-Form Video Industry',
      text: '',
    },
    {
      headline:
        'Clik Clok Celebrates Surging User Growth, Expanding Its Reach in the Short-Form Video World',
      text: '',
    },
    { headline: 'ClikClok Hits a Billion Downloads, Changing the Face of Social Media', text: '' },
    { headline: "ClikClok's Positive Impact: Fostering Creativity and Connection", text: '' },
    { headline: 'ClikClok Empowers the Next Generation of Content Creators', text: '' },
  ],
}

export const NILE_NEWS_STORIES = {
  [NewsType.VERY_BEARISH]: [
    {
      headline: 'Nile, Prominent Online Retailer, Faces Financial Turmoil as Earnings Plummet',
      text: '',
    },
    {
      headline:
        'Nile Online Retailer Faces Financial Setback with Major Losses in Virtual Assistant Division',
      text: '',
    },
    { headline: 'Nile Faces Mounting Lawsuits Over Alleged Unfair Business Practices', text: '' },
    { headline: 'Nile Under Investigation for Alleged Privacy Breach, Users Concerned', text: '' },
    { headline: 'Nile Accused of Exploitative Labor Practices in Warehouses', text: '' },
    { headline: 'Regulatory Scrutiny Grows: Nile Faces Antitrust Concerns', text: '' },
    { headline: 'Investor Confidence Wavers as Nile Reports Disappointing Earnings', text: '' },
    { headline: 'Nile Grapples with Escalating Customer Complaints and Returns', text: '' },
    { headline: 'Nile Faces Boycott Threats Over Environmental Sustainability Concerns', text: '' },
    {
      headline: 'Market Experts Predict a Challenging Future for Nile Amidst Controversies',
      text: '',
    },
  ],
  [NewsType.BEARISH]: [
    {
      headline: 'Nile Video Stumbles as Subscriber Numbers Fall Short of Expectations',
      text: '',
    },
    {
      headline:
        'Nile Game Studios Cancels MMO Sensation "Grand Adventure" Amidst Overwhelming Negative Feedback',
      text: '',
    },
    { headline: "Nile's Stock Sees Minor Downturn Amidst Market Volatility", text: '' },
    { headline: 'Investors Exercise Caution as Nile Reports Modest Earnings Growth', text: '' },
    { headline: 'Nile Faces Scrutiny Over Alleged Privacy Concerns', text: '' },
    { headline: "Nile's Expansion Plans Raise Questions Among Investor Community", text: '' },
    { headline: 'Nile Struggles with Regulatory Compliance in International Markets', text: '' },
    { headline: "Investors Monitor Nile's Efforts to Address Worker Welfare", text: '' },
    { headline: "Market Reacts Cautiously to Nile's New Product Offerings", text: '' },
    { headline: "Nile's Delivery Delays Lead to Customer Frustration", text: '' },
    { headline: 'Nile Faces Growing Competition in the Online Retail Sector', text: '' },
    { headline: "Investors Express Concerns About Nile's Ad Campaign Effectiveness", text: '' },
  ],
  [NewsType.NEUTRAL]: [
    {
      headline: 'Brave Nile Delivery Driver Fends Off Mountain Lion in Daring Encounter',
      text: '',
    },
    {
      headline:
        'Nile, Leading Online Retailer, Takes Bold Step to Erase Carbon Emissions, Aims for Net Zero by 2040',
      text: '',
    },
    {
      headline: 'Nile Unveils Cutting-Edge Drone Delivery Service, Revolutionizing Online Shopping',
      text: '',
    },
    { headline: "Nile's Ambitious Plan to Expand Into Space Commerce Sparks Excitement", text: '' },
    { headline: "Nile's CEO Pledges $1 Billion for Environmental Conservation Efforts", text: '' },
    { headline: "Nile Introduces Revolutionary 'Green Packaging' to Reduce Waste", text: '' },
    { headline: "Nile's Innovative Virtual Shopping Experience Sets Industry Standard", text: '' },
    { headline: "Nile's AI-Powered Customer Service Chatbots Earn Rave Reviews", text: '' },
    { headline: "Nile Launches 'Nile for Good' Initiative, Aims to Combat Hunger", text: '' },
    {
      headline: "Nile's Cutting-Edge Warehouse Robotics Revolutionize Order Fulfillment",
      text: '',
    },
    { headline: "Nile's Partnership with Local Artisans Boosts Small Business Growth", text: '' },
    { headline: "Nile's Philanthropic Arm Donates Millions to Disaster Relief Efforts", text: '' },
    { headline: "Nile's Commitment to Sustainability: Carbon-Neutral Shipping by 2030", text: '' },
  ],
  [NewsType.BULLISH]: [
    {
      headline: `Nile's Strategic Product Announcements Boost Investor Confidence in Web Services Division`,
      text: '',
    },
    {
      headline: 'Nile Stages Remarkable Comeback: Bounces Back from Challenging Financial Quarter',
      text: '',
    },
    { headline: 'Nile Reports Steady Growth Despite Market Challenges', text: '' },
    { headline: "Investors Remain Optimistic About Nile's Long-Term Potential", text: '' },
    { headline: "Nile's Customer-Centric Approach Draws Positive Feedback", text: '' },
    { headline: 'Nile Expands Global Footprint, Fostering Investor Confidence', text: '' },
    { headline: "Nile's Commitment to Sustainability Earns Praise", text: '' },
    { headline: "Nile's Innovations Enhance User Experience, Attracting Interest", text: '' },
    { headline: "Market Analysts Acknowledge Nile's Resilience and Adaptability", text: '' },
    { headline: "Nile's Brand Recognition Grows, Bolstering Investor Trust", text: '' },
    { headline: "Nile's Long-Term Strategy Aligned with Industry Trends", text: '' },
  ],
  [NewsType.VERY_BULLISH]: [
    {
      headline:
        'Nile Online Retailer Surpasses Earnings Expectations, Reflecting Remarkable Growth',
      text: '',
    },
    {
      headline: `Nile's Video Streaming Platform Sees Explosive Growth: Subscriber Numbers Skyrocket`,
      text: '',
    },
    { headline: 'Nile Achieves Record-Breaking Sales, Solidifying Market Dominance', text: '' },
    { headline: 'Investors Celebrate as Nile Reports Stellar Q3 Earnings', text: '' },
    { headline: "Nile's Innovation Hub Drives Technological Advancements in E-Commerce", text: '' },
    { headline: "Nile's Seamless Shopping Experience Resonates with Users Worldwide", text: '' },
    { headline: "Positive Outlook: Analysts Bullish on Nile's Continued Success", text: '' },
    {
      headline: "Nile's Visionary Leadership Paves the Way for Future Growth and Innovation",
      text: '',
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
    { headline: 'DashEats Faces Severe Backlash Over Alleged Delivery Mishaps', text: '' },
    { headline: 'Investor Panic as DashEats Stock Crashes Amidst Earnings Plunge', text: '' },
    { headline: "DashEats' App Security Under Scrutiny, User Data Privacy Concerns", text: '' },
    {
      headline: "DashEats' Labor Practices Draw Ire, Accusations of Worker Exploitation",
      text: '',
    },
    { headline: 'Regulatory Challenges Loom as DashEats Expands into New Markets', text: '' },
    { headline: 'Investor Confidence Plummets as DashEats Reports Disastrous Quarter', text: '' },
    { headline: 'DashEats Grapples with Escalating Customer Complaints and Disputes', text: '' },
    { headline: 'DashEats Faces Boycott Threats Over Alleged Pricing Gouging', text: '' },
    {
      headline: 'Market Experts Predict Uphill Battle for DashEats in Competitive Sector',
      text: '',
    },
    { headline: 'DashEats Hit with Class-Action Lawsuit for Unfair Business Practices', text: '' },
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

export const MRHD_NEWS_STORIES = {
  [NewsType.VERY_BULLISH]: [
    { headline: "MacroHard's AI-Powered Devices Set to Transform Daily Life", text: '' },
    { headline: 'Investors Rejoice as MacroHard Reports Remarkable Revenue Growth', text: '' },
    { headline: "MacroHard's Cutting-Edge Innovations Reshape Tech Landscape", text: '' },
    { headline: "Market Celebrates MacroHard's Successful Global Expansion", text: '' },
    { headline: "MacroHard's Cloud Services Segment Drives Impressive Profit Margins", text: '' },
    { headline: "Optimistic Outlook: Analysts Bullish on MacroHard's Future Prospects", text: '' },
    {
      headline: 'MacroHard Sets the Standard for Tech Excellence with Outstanding Performance',
      text: '',
    },
  ],
  [NewsType.BULLISH]: [
    { headline: "Investors Express Confidence in MacroHard's Consistent Performance", text: '' },
    { headline: "MacroHard's Latest Product Updates Receive Positive Feedback", text: '' },
    { headline: "MacroHard's CEO Optimistic About Future Growth Opportunities", text: '' },
    { headline: 'Steady User Growth Reflects Positively on MacroHard', text: '' },
    { headline: "MacroHard's Strategic Partnerships Foster Investor Interest", text: '' },
    { headline: "Market Analysts Assess MacroHard's Role in Tech Industry Evolution", text: '' },
    { headline: "Investors Acknowledge MacroHard's Strong Brand Presence", text: '' },
    { headline: "MacroHard's Commitment to Innovation Resonates with Shareholders", text: '' },
    { headline: "MacroHard's Long-Term Strategy Aligns with Tech Sector Trends", text: '' },
  ],
  [NewsType.NEUTRAL]: [
    { headline: 'MacroHard Unveils Bold Vision for the Future of Computing', text: '' },
    {
      headline: 'MacroHard Partners with Leading Universities to Foster Tech Innovation',
      text: '',
    },
    { headline: "MacroHard's CEO Discusses the Impact of Tech on Education", text: '' },
    { headline: 'MacroHard Expands Data Centers to Meet Growing Demand', text: '' },
    {
      headline: "MacroHard's Philanthropic Arm Donates Millions to Support STEM Education",
      text: '',
    },
    { headline: "MacroHard's Virtual Reality Venture Sparks Excitement Among Users", text: '' },
    { headline: "MacroHard's Cybersecurity Initiatives Earn Industry Recognition", text: '' },
    { headline: 'MacroHard Stock Resilient in Face of Market Volatility', text: '' },
    { headline: 'MacroHard Hosts Tech Summit to Explore Future Innovations', text: '' },
  ],
  [NewsType.BEARISH]: [
    { headline: 'Investors Cautious as MacroHard Reports Modest Earnings Growth', text: '' },
    { headline: "MacroHard's Latest Product Release Receives Mixed User Reviews", text: '' },
    { headline: "MacroHard's CEO Acknowledges Market Challenges Ahead", text: '' },
    { headline: "Market Reacts Cautiously to MacroHard's Expansion Strategies", text: '' },
    { headline: 'MacroHard Grapples with Regulatory Scrutiny in Key Markets', text: '' },
    { headline: 'Investors Monitor Growing Competition in the Tech Sector', text: '' },
    { headline: 'MacroHard Stock Shows Marginal Decline Amid Economic Uncertainty', text: '' },
    { headline: "Investors Express Concern About MacroHard's Patent Lawsuits", text: '' },
    { headline: 'MacroHard Faces Short-Term Challenges as It Navigates Tech Landscape', text: '' },
  ],
  [NewsType.VERY_BEARISH]: [
    { headline: 'Investors Flee as MacroHard Faces Severe Data Breach Scandal', text: '' },
    { headline: "MacroHard's Bleak Revenue Forecast Sends Shockwaves Through Market", text: '' },
    { headline: 'Regulatory Troubles Loom Large Over Troubled MacroHard', text: '' },
    { headline: 'Investor Confidence in MacroHard Reaches an All-Time Low', text: '' },
    { headline: 'Market Experts Predict a Grim Future for MacroHard Amidst Scandals', text: '' },
    { headline: 'MacroHard Faces Massive User Exodus Following Privacy Debacle', text: '' },
  ],
}

export const NDFX_NEWS_STORIES = {
  [NewsType.VERY_BULLISH]: [
    {
      headline: 'Nedflix Emerges as Top Streaming Choice with Record-Breaking Subscribers',
      text: '',
    },
    { headline: 'Investors Rejoice as Nedflix Reports Exceptional Q4 Earnings', text: '' },
    { headline: 'Nedflix Dominates the Streaming Market with Premium Original Content', text: '' },
    { headline: 'Nedflix Receives Rave Reviews for Diverse and Inclusive Programming', text: '' },
    { headline: 'Nedflix CEO Named Visionary Leader for Transforming Entertainment', text: '' },
    { headline: "Nedflix's User-Centric Approach Earns Unprecedented Viewer Loyalty", text: '' },
    { headline: "Industry Experts Bullish on Nedflix's Global Expansion Strategy", text: '' },
    {
      headline: 'Nedflix Wins Multiple Awards for Outstanding Original Series and Films',
      text: '',
    },
  ],
  [NewsType.BULLISH]: [
    { headline: 'Nedflix Continues to Gain Ground with Growing Subscriber Base', text: '' },
    { headline: "Investors Show Confidence in Nedflix's Steady Earnings Growth", text: '' },
    { headline: "Nedflix's Original Content Receives Acclaim from Critics", text: '' },
    { headline: 'Nedflix Focuses on User Experience, Garnering Positive Feedback', text: '' },
    { headline: "Nedflix's Diverse Content Library Appeals to a Global Audience", text: '' },
    {
      headline: "Market Analysts Acknowledge Nedflix's Resilience in a Competitive Industry",
      text: '',
    },
    { headline: "Nedflix's Innovations in Streaming Tech Enhance Viewer Satisfaction", text: '' },
    { headline: 'Investor Trust in Nedflix Remains Strong Amidst Market Fluctuations', text: '' },
    { headline: "Nedflix's Expanding International Reach Draws Interest from Viewers", text: '' },
    {
      headline: "Nedflix's Long-Term Strategy Aligned with the Evolution of Entertainment",
      text: '',
    },
  ],
  [NewsType.NEUTRAL]: [
    { headline: 'Nedflix Launches New User-Friendly App Interface', text: '' },
    { headline: "Investors Keep a Watchful Eye on Nedflix's Market Performance", text: '' },
    { headline: 'Nedflix Continues to Deliver a Variety of Entertainment Choices', text: '' },
    { headline: 'Nedflix Explores Strategies for Global Content Partnerships', text: '' },
    { headline: "Nedflix's Efforts to Enhance Content Discovery for Viewers", text: '' },
    { headline: 'Advertisers Seek Opportunities for Brand Engagement on Nedflix', text: '' },
    { headline: "Nedflix's CEO Discusses the Future of Streaming at Industry Summit", text: '' },
    { headline: 'Nedflix Prioritizes User Data Privacy with Updated Policies', text: '' },
    { headline: 'Nedflix Announces Plans for Upcoming Original Series Releases', text: '' },
  ],
  [NewsType.BEARISH]: [
    { headline: 'Nedflix Faces Tough Competition in Crowded Streaming Market', text: '' },
    { headline: 'Investors Express Caution as Nedflix Reports Modest Earnings Growth', text: '' },
    { headline: "Nedflix's Original Content Receives Mixed Reviews from Critics", text: '' },
    { headline: 'Nedflix Users Voice Concerns Over Content Discovery Challenges', text: '' },
    { headline: 'Nedflix Grapples with Licensing Issues for Popular Shows and Movies', text: '' },
    {
      headline: 'Investors Monitor Growing Pressure on Nedflix to Expand Internationally',
      text: '',
    },
    { headline: 'Advertisers Evaluate the Effectiveness of Campaigns on Nedflix', text: '' },
    { headline: "Nedflix's CEO Addresses User Privacy Concerns Amidst Data Breaches", text: '' },
    { headline: 'Content Creators Assess the Competitive Landscape on Nedflix', text: '' },
    { headline: 'Nedflix Faces Challenges in Retaining Exclusive Streaming Rights', text: '' },
  ],
  [NewsType.VERY_BEARISH]: [
    { headline: 'Investor Exodus from Nedflix Amidst Growing Content Controversies', text: '' },
    { headline: "Nedflix's Privacy Breach Nightmare: Millions of User Profiles Hacked", text: '' },
    { headline: 'Nedflix CEO Under Fire as Scandals and Stock Collapse Continue', text: '' },
    {
      headline: 'Regulatory Troubles Pile Up for Nedflix, Facing Multiple Investigations',
      text: '',
    },
    {
      headline: 'Advertisers Shun Nedflix Over Brand Safety Concerns and Advertiser Boycott',
      text: '',
    },
    { headline: 'Market Experts Predict Bleak Future for Nedflix Amidst Ongoing Crisis', text: '' },
    {
      headline: 'Nedflix Suffers Unprecedented User Exodus After Content Censorship Controversy',
      text: '',
    },
    { headline: "Investors Worried as Nedflix's Original Shows Fail to Impress Viewers", text: '' },
    {
      headline: 'Investors Recoil as Nedflix Records Multi-Billion Dollar Loss from Flopped Series',
      text: '',
    },
  ],
}

export const DIDN_NEWS_STORIES = {
  [NewsType.VERY_BULLISH]: [
    {
      headline: "Didney's Remarkable Year: Record-Breaking Earnings and Global Dominance",
      text: '',
    },
    { headline: "Didney's Iconic Brands and Beloved Characters Continue to Inspire", text: '' },
    { headline: "Didney's Unwavering Commitment to Creativity and Innovation Shines", text: '' },
    { headline: 'Didney Delivers Magical Experiences, Earning Praise from Audiences', text: '' },
    { headline: "Didney's Positive Impact on Communities: Philanthropy at Its Finest", text: '' },
    {
      headline: "Didney's Creative Excellence Sets the Gold Standard for Media and Entertainment",
      text: '',
    },
    {
      headline: 'Didney Expands Its Global Influence, Strengthening Partnerships Worldwide',
      text: '',
    },
    {
      headline: "Didney's Legacy of Imagination and Joy Lives On, Inspiring Generations",
      text: '',
    },
  ],
  [NewsType.BULLISH]: [
    { headline: 'Didney Continues to Delight Audiences with Timeless Classics', text: '' },
    { headline: "Investors Maintain Confidence in Didney's Resilience", text: '' },
    { headline: "Didney's Creative Ventures Receive Positive Industry Acknowledgment", text: '' },
    { headline: "Didney's Theme Parks Showcase Innovative Attractions and Experiences", text: '' },
    { headline: "Didney's Streaming Services Garner Growing User Base", text: '' },
    { headline: "Market Observers See Potential in Didney's Expanding IP Universe", text: '' },
    { headline: "Didney's Family-Friendly Content Resonates with Global Audiences", text: '' },
    { headline: "Didney's CEO Focuses on Sustainable Initiatives for the Future", text: '' },
    { headline: "Didney's Philanthropic Efforts Impact Communities in Meaningful Ways", text: '' },
    { headline: "Didney's Commitment to Inclusivity Reflects Positively on Its Brand", text: '' },
  ],
  [NewsType.NEUTRAL]: [
    { headline: 'Didney Announces Upcoming Slate of Film and TV Releases', text: '' },
    { headline: "Investors Monitor Didney's Steady Performance in Dynamic Industry", text: '' },
    { headline: 'Didney Continues to Evolve Its Theme Park Experiences', text: '' },
    { headline: 'Didney Expands Licensing Agreements with New Merchandise Partners', text: '' },
    { headline: "Didney's CEO Discusses Company's Position in Changing Media Landscape", text: '' },
    { headline: "Didney's Iconic Characters Remain a Fixture in Pop Culture", text: '' },
    { headline: "Didney's Streaming Services Face Competition in Crowded Market", text: '' },
    { headline: 'Didney Navigates Challenges in Global Distribution and Licensing', text: '' },
    {
      headline: "Didney's Commitment to Environmental Sustainability Highlighted in Initiatives",
      text: '',
    },
    {
      headline: "Didney's Cultural Impact Examined in Light of Changing Audience Trends",
      text: '',
    },
  ],
  [NewsType.BEARISH]: [
    { headline: 'Didney Faces Criticism for Handling of Controversial Content', text: '' },
    { headline: 'Investors Keep an Eye on Didney Amidst Streaming Wars', text: '' },
    { headline: "Didney's Theme Park Attendance Dips Amidst Pandemic Challenges", text: '' },
    { headline: 'Didney Encounters Labor Disputes with Park Workers', text: '' },
    { headline: "Didney's Streaming Service Grapples with Content Moderation Issues", text: '' },
    { headline: "Didney's Expensive Theme Park Ticket Prices Raise Concerns", text: '' },
    { headline: "Investors Weigh Didney's Heavy Reliance on Established IPs", text: '' },
    { headline: "Didney's CEO Faces Scrutiny for Compensation Amidst Layoffs", text: '' },
    { headline: "Didney's Recent Film Releases Receive Mixed Reviews from Critics", text: '' },
    { headline: "Didney's Subscription Services Face Cancellations Over Price Hikes", text: '' },
  ],
  [NewsType.VERY_BEARISH]: [
    { headline: "Didney's Struggles Continue as Earnings Plunge Amidst Industry Shifts", text: '' },
    { headline: 'Investors Panic as Didney Faces Steepest Stock Drop in a Decade', text: '' },
    { headline: 'Didney Faces Mounting Backlash Over Controversial Content Decisions', text: '' },
    { headline: "Didney's Theme Parks Grapple with Attendance Crisis and Layoffs", text: '' },
    { headline: 'Regulatory Probes Loom Over Didney Amid Antitrust Concerns', text: '' },
    { headline: 'Didney CEO Under Fire for Alleged Mishandling of Company Resources', text: '' },
    { headline: "Didney's Streaming Services Haunted by User Data Privacy Scandals", text: '' },
    { headline: "Didney's Labor Practices Criticized Amid Reports of Exploitation", text: '' },
    { headline: "Didney's Revamped Film Slate Fails to Revive Box Office Fortunes", text: '' },
    {
      headline: "Investor Confidence Hits Rock Bottom as Didney's Future Remains Uncertain",
      text: '',
    },
  ],
}

export const VVDA_NEWS_STORIES = {
  [NewsType.VERY_BULLISH]: [
    {
      headline: 'Viva La NVidya Revolutionizes Gaming with Breakthrough Graphics Technology',
      text: '',
    },
    { headline: "Investors Celebrate Viva La NVidya's Remarkable Growth and Innovation", text: '' },
    {
      headline: "Viva La NVidya's Graphics Cards Dominate Market with Unparalleled Performance",
      text: '',
    },
    { headline: "Viva La NVidya's AI Solutions Earn Acclaim for Industry Disruption", text: '' },
    {
      headline: 'Viva La NVidya Pushes Boundaries with Cutting-Edge Research and Development',
      text: '',
    },
    {
      headline: "Viva La NVidya's Philanthropic Efforts Support STEM Education Worldwide",
      text: '',
    },
    { headline: 'Viva La NVidya Inspires Creativity and Innovation in Tech and Gaming', text: '' },
  ],
  [NewsType.BULLISH]: [
    { headline: 'Viva La NVidya Continues to Impress Gamers with High-Performance GPUs', text: '' },
    { headline: "Investors Remain Bullish on Viva La NVidya's Future Growth Prospects", text: '' },
    {
      headline: "Viva La NVidya's Gaming Graphics Cards Gaining Popularity Among Enthusiasts",
      text: '',
    },
    { headline: "Viva La NVidya's CEO Shares Vision for Advancing GPU Technology", text: '' },
    { headline: "Viva La NVidya's Innovations in AI Chipsets Show Promise", text: '' },
    { headline: 'Viva La NVidya Stock Holds Steady Amidst Market Volatility', text: '' },
    { headline: 'Viva La NVidya Explores Collaborations to Expand Its Reach', text: '' },
    {
      headline: "Viva La NVidya's Commitment to Research and Development Evident in New Products",
      text: '',
    },
    {
      headline: "Viva La NVidya's Efforts to Foster Diversity in Tech Industry Recognized",
      text: '',
    },
    {
      headline: "Viva La NVidya's Contributions to STEM Education Applauded by Educators",
      text: '',
    },
  ],
  [NewsType.NEUTRAL]: [
    { headline: 'Viva La NVidya Announces Latest GPU Product Lineup', text: '' },
    { headline: "Investors Monitor Viva La NVidya's Stock Performance in Tech Sector", text: '' },
    { headline: 'Viva La NVidya Explores Opportunities in AI and Gaming Industries', text: '' },
    { headline: "Viva La NVidya's CEO Speaks at Tech Conference on Industry Trends", text: '' },
    { headline: "Viva La NVidya's Graphics Cards Maintain Market Presence", text: '' },
    { headline: "Viva La NVidya's Research and Development Initiatives Show Progress", text: '' },
    {
      headline: "Viva La NVidya's Commitment to Sustainability Highlighted in Annual Report",
      text: '',
    },
    {
      headline: 'Viva La NVidya Seeks to Enhance User Experience with New Software Updates',
      text: '',
    },
    { headline: 'Viva La NVidya Collaborates with Partners for Industry Advancements', text: '' },
    {
      headline: "Viva La NVidya's Contributions to STEM Education Recognized by Schools",
      text: '',
    },
  ],
  [NewsType.BEARISH]: [
    { headline: 'Viva La NVidya Faces Increased Competition in Crowded GPU Market', text: '' },
    { headline: "Investors Express Caution as Viva La NVidya's Stock Price Fluctuates", text: '' },
    { headline: "Viva La NVidya's Graphics Cards Encounter Manufacturing Delays", text: '' },
    { headline: 'Viva La NVidya Grapples with Supply Chain Disruptions', text: '' },
    { headline: "Viva La NVidya's CEO Addresses Concerns Over Chip Shortages", text: '' },
    {
      headline: 'Investors Assess Potential Impact of Industry Regulations on Viva La NVidya',
      text: '',
    },
    { headline: "Viva La NVidya's AI Chipsets Receive Mixed Reviews from Tech Experts", text: '' },
    { headline: 'Viva La NVidya Faces Challenges in Expanding into Emerging Markets', text: '' },
    { headline: "Viva La NVidya's Strategic Partnerships Encounter Roadblocks", text: '' },
    {
      headline: "Viva La NVidya's Research and Development Expenses Impact Quarterly Earnings",
      text: '',
    },
  ],
  [NewsType.VERY_BEARISH]: [
    {
      headline: 'Viva La NVidia in Crisis: Stock Prices Plummet Amidst Mounting Challenges',
      text: '',
    },
    { headline: 'Investors in Panic as Viva La NVidia Reports Record Losses', text: '' },
    { headline: 'Viva La NVidia Faces Backlash Over Controversial Business Practices', text: '' },
    {
      headline: "Viva La NVidia's Reputation Takes a Hit Amidst Product Quality Concerns",
      text: '',
    },
    {
      headline: 'Regulatory Probes Intensify as Viva La NVidia Navigates Legal Troubles',
      text: '',
    },
    { headline: 'Viva La NVidia CEO Under Scrutiny for Mismanagement Amidst Layoffs', text: '' },
    {
      headline: "Viva La NVidia's Struggles in Competitive Market Lead to Mass Customer Exodus",
      text: '',
    },
    { headline: 'Investor Confidence in Viva La NVidia at an All-Time Low', text: '' },
    { headline: 'Market Experts Predict Bleak Future for Viva La NVidia Amidst Crisis', text: '' },
  ],
}

export const GG_NEWS_STORIES = {
  [NewsType.VERY_BULLISH]: [
    { headline: "GameGo's CEO Hailed as Savior of the Video Game Retail Industry", text: '' },
    { headline: "GameGo's Innovative Strategy Transforms Retail Experience for Gamers", text: '' },
    { headline: "GameGo's Commitment to Gaming Community Earns Rave Reviews", text: '' },
    { headline: "GameGo's Bold Moves Pay Off with Record-Breaking Earnings", text: '' },
    { headline: "GameGo's Thriving Ecosystem Thrills Gamers and Investors Alike", text: '' },
    { headline: "GameGo's Expansion Plans Spark Excitement in the Gaming World", text: '' },
    { headline: "GameGo's Visionary Leadership Sets the Stage for Future Success", text: '' },
    { headline: "GameGo's Astonishing Revival: The Power of the Memestock Movement", text: '' },
    { headline: "GameGo's Innovative Strategies Transform It into Memestock Darling", text: '' },
  ],
  [NewsType.BULLISH]: [
    { headline: "GameGo's Stock Shows Steady Growth in an Evolving Market", text: '' },
    { headline: "Investors Find Renewed Confidence in GameGo's Performance", text: '' },
    { headline: "GameGo's Customer-Centric Approach Resonates with Gamers", text: '' },
    { headline: 'GameGo Adapts to Changing Trends, Remains Relevant in Retail', text: '' },
    { headline: 'GameGo Reports Modest Earnings Increase, Encouraging Investors', text: '' },
    { headline: 'Investor Interest in GameGo Grows as Company Explores New Initiatives', text: '' },
    { headline: "GameGo's Gaming Community Engagement Receives Positive Feedback", text: '' },
    { headline: "GameGo's CEO Discusses Vision for the Future of Video Game Retail", text: '' },
    { headline: "GameGo's Resilience in Competitive Market Noted by Analysts", text: '' },
    { headline: "GameGo's Commitment to Employee Wellbeing Recognized", text: '' },
  ],
  [NewsType.NEUTRAL]: [
    { headline: 'GameGo Announces Updates to Its Retail Store Locations', text: '' },
    { headline: "Investors Closely Monitor GameGo's Performance Amid Industry Shifts", text: '' },
    {
      headline: 'GameGo Continues to Serve Gaming Enthusiasts with Diverse Product Range',
      text: '',
    },
    { headline: "GameGo's CEO Speaks at Industry Event on Market Trends", text: '' },
    { headline: 'GameGo Faces Challenges Amidst Digitalization of Gaming', text: '' },
    { headline: "GameGo's Recent Financial Report Reflects Market Conditions", text: '' },
    { headline: "Investors Analyze GameGo's Place in the Evolving Gaming Landscape", text: '' },
    { headline: "GameGo's Efforts to Enhance In-Store Experience for Customers", text: '' },
    { headline: 'GameGo Seeks Strategic Partnerships for Growth Opportunities', text: '' },
    {
      headline: "GameGo's Role in Gaming Culture Examined Amidst Industry Transformations",
      text: '',
    },
  ],
  [NewsType.BEARISH]: [
    { headline: 'GameGo Grapples with Declining Sales in an Evolving Gaming Market', text: '' },
    { headline: 'Investor Concerns Emerge as GameGo Faces Stock Price Volatility', text: '' },
    { headline: "GameGo's Struggle to Adapt to Digital Gaming Trends Raises Questions", text: '' },
    { headline: 'GameGo Reports Modest Earnings Drop Amidst Industry Challenges', text: '' },
    { headline: "GameGo's CEO Acknowledges Tough Retail Climate for Physical Games", text: '' },
    {
      headline: 'Investors Cautious as GameGo Encounters Competition from Online Retailers',
      text: '',
    },
    { headline: "GameGo's Store Closure Plans Draw Mixed Reactions from Gamers", text: '' },
    {
      headline: "GameGo's Efforts to Stay Relevant Face Hurdles in Fast-Changing Industry",
      text: '',
    },
    { headline: "GameGo's Footprint Shrinks as Digital Downloads Gain Popularity", text: '' },
    { headline: "Market Experts Debate GameGo's Future Amidst Retail Headwinds", text: '' },
  ],
  [NewsType.VERY_BEARISH]: [
    { headline: 'Investors Panic as GameGo Reports Record Losses in Recent Quarter', text: '' },
    { headline: "GameGo's Struggles Escalate with Mounting Debt and Store Closures", text: '' },
    {
      headline: "GameGo's CEO Under Fire for Controversial Business Decisions Amidst Layoffs",
      text: '',
    },
    { headline: 'Regulatory Investigations Intensify as GameGo Navigates Legal Woes', text: '' },
    {
      headline: "GameGo's Reputation Takes a Hit Amidst Customer Complaints and Boycotts",
      text: '',
    },
    { headline: 'Investor Confidence in GameGo at an All-Time Low as Stock Tumbles', text: '' },
    { headline: "GameGo's Privacy Breaches Shake User Trust in the Company", text: '' },
    { headline: 'Market Experts Predict Bleak Future for GameGo Amidst Ongoing Crisis', text: '' },
    { headline: "GameGo's Stock Prices Plummet, Casting Shadow Over Its Survival", text: '' },
    { headline: "GameGo's Risky Bet on NFTs Backfires: Massive Losses Reported", text: '' },
    { headline: "Market Experts Condemn GameGo's Hasty Dive into NFTs as Foolish Move", text: '' },
    {
      headline: "GameGo's Desperate Attempt to Stay Afloat with NFTs Leads to Financial Ruin",
      text: '',
    },
  ],
}

export const BRB_NEWS_STORIES = {
  [NewsType.VERY_BULLISH]: [
    { headline: "BrickBerry's Memestock Revival: An Iconic Brand Reborn", text: '' },
    { headline: "BrickBerry's Remarkable Memestock Rally: From Legacy to Legend", text: '' },
    {
      headline: "BrickBerry's Renaissance: Iconic Smartphone Brand Stages Remarkable Comeback",
      text: '',
    },
    {
      headline: 'Investors Thrilled as BrickBerry Records Impressive Sales and Innovation',
      text: '',
    },
    { headline: "BrickBerry's CEO Leads the Charge in Transforming the Tech Landscape", text: '' },
    {
      headline: "BrickBerry's Resurgence Shines Bright as It Returns to Market Prominence",
      text: '',
    },
    {
      headline: "BrickBerry's Commitment to Security and Innovation Resonates with Users",
      text: '',
    },
    {
      headline: 'Investor Confidence Soars as BrickBerry Stock Price Surges to New Highs',
      text: '',
    },
    { headline: "BrickBerry's Cutting-Edge Devices Garner Praise for Modernization", text: '' },
    {
      headline: "BrickBerry's Legacy of Productivity Finds New Relevance in the Digital Age",
      text: '',
    },
    {
      headline: "BrickBerry's Strategic Partnerships Enhance Its Global Reach and Impact",
      text: '',
    },
    { headline: "BrickBerry's Return to Prominence Inspires Tech Enthusiasts Worldwide", text: '' },
  ],
  [NewsType.BULLISH]: [
    { headline: 'BrickBerry Makes Steady Progress in Its Quest for a Tech Comeback', text: '' },
    { headline: 'Investors Show Interest as BrickBerry Pursues a Revival Strategy', text: '' },
    { headline: "BrickBerry's Efforts to Modernize Legacy Features Receive Recognition", text: '' },
    { headline: "BrickBerry's CEO Discusses Plans for Company's Ongoing Transformation", text: '' },
    {
      headline: "BrickBerry's Commitment to Data Security Appeals to Privacy-Conscious Users",
      text: '',
    },
    { headline: "Investors Acknowledge BrickBerry's Potential in Niche Markets", text: '' },
    {
      headline: "BrickBerry's Nostalgic Appeal Finds a Place Amongst Smartphone Choices",
      text: '',
    },
    {
      headline: "BrickBerry's Product Updates Highlight Its Evolution in the Tech World",
      text: '',
    },
    { headline: "BrickBerry's Partnerships Signal Promising Prospects for the Brand", text: '' },
    { headline: "BrickBerry's Renewed Focus on Productivity Features Garners Interest", text: '' },
  ],
  [NewsType.NEUTRAL]: [
    { headline: 'BrickBerry Releases Latest Smartphone Model with Updated Features', text: '' },
    { headline: "Investors Monitor BrickBerry's Performance in Competitive Tech Sector", text: '' },
    { headline: 'BrickBerry Continues to Offer Secure Communication Solutions', text: '' },
    { headline: "BrickBerry CEO Discusses Company's Role in Evolving Mobile Landscape", text: '' },
    { headline: "BrickBerry's Classic Design Resonates with Some Niche User Groups", text: '' },
    { headline: 'BrickBerry Faces Challenges Amidst Shifting Smartphone Trends', text: '' },
    { headline: "BrickBerry's Legacy of Corporate Security Solutions Underscored", text: '' },
    { headline: 'BrickBerry Explores Partnerships to Expand Its Market Presence', text: '' },
    { headline: "BrickBerry's Transition Reflects Ongoing Changes in Mobile Technology", text: '' },
    { headline: "Industry Observers Assess BrickBerry's Place in Modern Tech Market", text: '' },
  ],
  [NewsType.BEARISH]: [
    { headline: 'BrickBerry Struggles to Regain Wider Consumer Appeal', text: '' },
    { headline: 'Investors Remain Cautious as BrickBerry Faces Market Challenges', text: '' },
    { headline: "BrickBerry's Smartphone Sales Stall Amidst Tough Competition", text: '' },
    { headline: 'BrickBerry CEO Acknowledges Tough Road Ahead in Crowded Tech Space', text: '' },
    {
      headline: "BrickBerry's Niche Focus Raises Questions About Its Long-Term Viability",
      text: '',
    },
    { headline: 'Investor Interest in BrickBerry Dips as Stock Price Fluctuates', text: '' },
    {
      headline: "BrickBerry's Legacy Features Pose Challenges in the Age of Smartphones",
      text: '',
    },
    { headline: "BrickBerry's Efforts to Modernize Met with Mixed Reviews", text: '' },
    {
      headline: "BrickBerry's Market Share Continues to Shrink in Competitive Landscape",
      text: '',
    },
    { headline: "Industry Analysts Assess BrickBerry's Position Amidst Changing Trends", text: '' },
  ],
  [NewsType.VERY_BEARISH]: [
    {
      headline: 'Investors Panic as BrickBerry Faces Record Losses and Uncertain Future',
      text: '',
    },
    { headline: "BrickBerry's CEO Under Fire for Failing to Revive the Ailing Company", text: '' },
    {
      headline: "BrickBerry's Stagnation Exposes Challenges in a Rapidly Advancing Market",
      text: '',
    },
    {
      headline: 'Regulatory Scrutiny Intensifies as BrickBerry Struggles to Stay Afloat',
      text: '',
    },
    { headline: "BrickBerry's Reputation in Shambles Amidst Customer Complaints", text: '' },
    {
      headline: 'Investor Confidence in BrickBerry Nosedives as Stock Hits All-Time Low',
      text: '',
    },
    { headline: "BrickBerry's Privacy Breaches Shake User Trust and Loyalty", text: '' },
    { headline: 'Market Experts Predict Bleak Future for BrickBerry Amidst Crisis', text: '' },
    { headline: "BrickBerry's Desperate Measures Fail to Halt Its Ongoing Decline", text: '' },
  ],
}

export const ANC_NEWS_STORIES = {
  [NewsType.VERY_BULLISH]: [
    { headline: 'ANC Theatres Leads Industry Revival: Moviegoers Return in Droves', text: '' },
    {
      headline: 'Investors Rejoice as ANC Theatres Posts Spectacular Box Office Results',
      text: '',
    },
    {
      headline: "ANC Theatres' CEO Lauded for Innovative Strategies in Challenging Times",
      text: '',
    },
    {
      headline: 'ANC Theatres Redefines the Movie-Going Experience with Exciting Offerings',
      text: '',
    },
    { headline: 'ANC Theatres Sets New Records with Blockbuster Movie Releases', text: '' },
    { headline: 'Investor Confidence Soars as ANC Theatres Stock Reaches New Heights', text: '' },
    {
      headline: "ANC Theatres' Commitment to Safety Measures Earns Applause from Patrons",
      text: '',
    },
    {
      headline: 'ANC Theatres Expands Reach with Strategic Acquisitions and Renovations',
      text: '',
    },
    { headline: "ANC Theatres' Role in Supporting the Film Industry Recognized", text: '' },
    { headline: "ANC Theatres' Community Engagement Initiatives Win Hearts and Minds", text: '' },
  ],
  [NewsType.BULLISH]: [
    { headline: 'ANC Theatres Sees Encouraging Turnout as Moviegoers Return', text: '' },
    { headline: "Investors Find Reasons for Optimism in ANC Theatres' Performance", text: '' },
    { headline: 'ANC Theatres Offers Enhanced Movie-Going Experiences for Audiences', text: '' },
    {
      headline: "ANC Theatres' CEO Shares Strategies for Navigating Industry Challenges",
      text: '',
    },
    { headline: 'ANC Theatres Enjoys Box Office Success with Recent Film Releases', text: '' },
    { headline: 'Investor Interest in ANC Theatres Grows Amidst Positive Signals', text: '' },
    { headline: "ANC Theatres' Safety Measures Foster a Reassuring Theater Environment", text: '' },
    {
      headline: 'ANC Theatres Expands Footprint with Select Renovations and Innovations',
      text: '',
    },
    { headline: 'ANC Theatres Continues to Play a Vital Role in Promoting Cinema', text: '' },
    {
      headline: "ANC Theatres' Community Involvement Initiatives Make a Positive Impact",
      text: '',
    },
  ],
  [NewsType.NEUTRAL]: [
    { headline: 'ANC Theatres Updates Safety Protocols in Response to Changing Times', text: '' },
    { headline: "Investors Monitor ANC Theatres' Performance Amidst Industry Shifts", text: '' },
    { headline: 'ANC Theatres Continues to Offer Diverse Movie Options for Audiences', text: '' },
    { headline: "ANC Theatres' CEO Discusses Insights on Current Cinema Landscape", text: '' },
    { headline: 'ANC Theatres Faces Challenges and Opportunities in Evolving Market', text: '' },
    { headline: "ANC Theatres' Movie-Going Experience Reflects Current Industry Trends", text: '' },
    { headline: "Investors Assess ANC Theatres' Position Amidst Market Fluctuations", text: '' },
    { headline: 'ANC Theatres Highlights Commitment to Community Engagement', text: '' },
    { headline: 'ANC Theatres Seeks Collaborations to Enhance Movie Offerings', text: '' },
    {
      headline: "Industry Observers Analyze ANC Theatres' Role in Modern Cinema Culture",
      text: '',
    },
  ],
  [NewsType.BEARISH]: [
    {
      headline: 'ANC Theatres Grapples with Lower Attendance Amidst Industry Challenges',
      text: '',
    },
    { headline: "Investors Express Caution as ANC Theatres' Revenue Faces Pressure", text: '' },
    { headline: "ANC Theatres' CEO Acknowledges Tough Market Conditions for Cinemas", text: '' },
    { headline: 'ANC Theatres Sees Mixed Results with Recent Movie Releases', text: '' },
    { headline: 'ANC Theatres Faces Stiff Competition from Streaming Services', text: '' },
    { headline: 'Investor Confidence in ANC Theatres Wavers Amidst Industry Turbulence', text: '' },
    {
      headline: "ANC Theatres' Efforts to Adapt to Changing Movie-Going Habits Raise Concerns",
      text: '',
    },
    { headline: "ANC Theatres' Renovation Plans Encounter Hurdles in Current Climate", text: '' },
    { headline: 'ANC Theatres Continues to Navigate Challenges in Film Exhibition', text: '' },
    { headline: "Market Experts Debate ANC Theatres' Future Amidst Industry Headwinds", text: '' },
  ],
  [NewsType.VERY_BEARISH]: [
    { headline: 'ANC Theatres in Dire Straits: Attendance Plummets as Crisis Deepens', text: '' },
    { headline: 'Investors in Panic as ANC Theatres Reports Record Losses', text: '' },
    { headline: 'ANC Theatres CEO Under Fire for Failing to Revive Ailing Cinema Chain', text: '' },
    { headline: "ANC Theatres' Struggles Highlight Challenges in an Evolving Industry", text: '' },
    {
      headline: 'Regulatory Scrutiny Mounts as ANC Theatres Grapples with Financial Crisis',
      text: '',
    },
    { headline: "ANC Theatres' Reputation Takes a Hit Amidst Customer Dissatisfaction", text: '' },
    {
      headline: 'Investor Confidence in ANC Theatres at an All-Time Low as Stock Tumbles',
      text: '',
    },
    {
      headline: "ANC Theatres' Struggle to Adapt to Changing Movie Habits Spells Trouble",
      text: '',
    },
    { headline: "ANC Theatres' Financial Woes Lead to Massive Layoffs and Closures", text: '' },
    { headline: 'Market Experts Predict Bleak Future for ANC Theatres Amidst Crisis', text: '' },
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
  [StockSymbols.MRHD]: MRHD_NEWS_STORIES,
  [StockSymbols.NDFX]: NDFX_NEWS_STORIES,
  [StockSymbols.DIDN]: DIDN_NEWS_STORIES,
  [StockSymbols.VVDA]: VVDA_NEWS_STORIES,
  [StockSymbols.GG]: GG_NEWS_STORIES,
  [StockSymbols.BRB]: BRB_NEWS_STORIES,
  [StockSymbols.ANC]: ANC_NEWS_STORIES,
}
