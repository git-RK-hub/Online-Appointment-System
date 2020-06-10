const NewsAPI = require('newsapi');

export default class GetNews {
  constructor() {
    this.api = 'News Api';
  }

  async getInfo() {
    let title = [];
    let url = [];
    let img = [];
    const articles = [
      {
        source: {
          id: null,
          name: 'Livemint'
        },
        author: 'Bloomberg',
        title:
          'Coronavirus lockdowns may have helped prevent half a billion Covid-19 cases - Livemint',
        description:
          'An analysis published in Nature, suggests that the coronavirus death toll would have been vastly worse without lockdowns, social distancing, travel restrictions and other interventions',
        url:
          'https://www.livemint.com/news/world/coronavirus-lockdowns-may-have-helped-prevent-half-a-billion-covid-19-cases-11591624192076.html',
        urlToImage:
          'https://images.livemint.com/img/2020/06/08/600x338/AFP_1PY1JD_1584432501612_1591624600713.jpg',
        publishedAt: '2020-06-08T16:01:09Z',
        content:
          'Lockdowns and other public-health measures may have prevented about half a billion coronavirus infections in six countries, including China and the US.The virus has now caused some 7 million reported… [+1928 chars]'
      },
      {
        source: {
          id: null,
          name: 'Firstpost'
        },
        author: null,
        title:
          'People with male pattern baldness may be more susceptible to severe COVID-19, says study by Spanish... - Firstpost',
        description:
          'A group of researchers suggest that men with male pattern baldness (or androgenic alopecia) are more likely to develop severe COVID-19.',
        url:
          'https://www.firstpost.com/health/people-with-male-pattern-baldness-may-be-more-susceptible-to-severe-covid-19-says-study-by-spanish-researchers-8460971.html',
        urlToImage:
          'https://images.firstpost.com/wp-content/uploads/2019/10/bald-742823_1280.jpg',
        publishedAt: '2020-06-08T15:35:53Z',
        content:
          'COVID-19 emerged just over six months ago and in this short span of time, researchers have found a lot about the disease. So far, it is known that men, the elderly and those with co-morbidities are a… [+3232 chars]'
      },
      {
        source: {
          id: null,
          name: 'Uniindia.com'
        },
        author: 'Uniindia News Service',
        title:
          'Comorbidity a prime risk to watch out in COVID times - United News of India',
        description:
          'Thiruvananthapuram, Jun 8 (UNI) The risk of death from COVID-19 significantly increases in people with comorbidities. At least that is what the evidence from Kerala suggests.',
        url:
          'http://www.uniindia.com/comorbidity-a-prime-risk-to-watch-out-in-covid-times/south/news/2030537.html',
        urlToImage: 'http://www.uniindia.com//images/stripad.png',
        publishedAt: '2020-06-08T15:28:00Z',
        content:
          'More News08 Jun 2020 | 10:06 PMKochi, Jun 8 (UNI) A youth hacked his friend for falling in love with his sister at Muvattupuzha here, police sources said on Monday.\r\nsee more..\r\n08 Jun 2020 | 9:49 PM… [+850 chars]'
      },
      {
        source: {
          id: null,
          name: 'YouTube'
        },
        author: null,
        title: "Long term impact of COVID-19 on survivors' health - NEWS9 live",
        description:
          'The novel Coronavirus is still a less understood disease as scientists and researchers race against time to understand more about this virus and find a cure ...',
        url: 'https://www.youtube.com/watch?v=6swc5rUd7P4',
        urlToImage: 'https://i.ytimg.com/vi/6swc5rUd7P4/maxresdefault.jpg',
        publishedAt: '2020-06-08T14:51:48Z',
        content: null
      },
      {
        source: {
          id: null,
          name: 'Hindustan Times'
        },
        author: 'Press Trust of India | Posted by: Alfea Jamal',
        title:
          'Here’s how BP medicine lowers Covid-19 death risk in hypertension patients - Hindustan Times',
        description:
          'Patients with high blood pressure who are not taking medication to control the condition may be at a greater risk of dying from novel coronavirus infection.',
        url:
          'https://www.hindustantimes.com/health/here-s-how-bp-medicine-lowers-covid-19-death-risk-in-hypertension-patients/story-5soxy7FsL7136C1ea5srUK.html',
        urlToImage:
          'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/06/08/Pictures/_007e73c6-a989-11ea-9c49-07241376e8f9.jpg',
        publishedAt: '2020-06-08T13:32:14Z',
        content:
          'Patients with high blood pressure who are not taking medication to control the condition may be at a greater risk of dying from novel coronavirus infection, according to a review of studies which say… [+3859 chars]'
      },
      {
        source: {
          id: null,
          name: 'Daijiworld.com'
        },
        author: null,
        title:
          'Indian-origin Prof loses job after retracted Covid-19 studies create furore - Daijiworld.com',
        description: '',
        url: 'https://www.daijiworld.com/news/newsDisplay.aspx?newsID=717345',
        urlToImage: 'http://daijiworld.com/images/daijiSquareLogo.png',
        publishedAt: '2020-06-08T13:02:47Z',
        content:
          'New York, Jun 8 (IANS): Suspicions in the medical research scandal involving a little known health analytics company grew deeper after the termination of the faculty position of one of the Indian-ori… [+3349 chars]'
      },
      {
        source: {
          id: null,
          name: 'Firstpost'
        },
        author: null,
        title:
          "AstraZeneca's cancer drug Acalabrutinib likely to help in treating COVID-19 patients with breathing... - Firstpost",
        description:
          'A study showed that acalabrutinib reduced the levels of interleukin-6 (IL-6) in the blood, which is otherwise responsible for creating inflammation in the body of COVID-19 patients.',
        url:
          'https://www.firstpost.com/health/astrazenecas-cancer-drug-acalabrutinib-likely-to-help-in-treating-covid-19-patients-with-breathing-difficulties-and-inflammation-8460421.html',
        urlToImage:
          'https://images.firstpost.com/wp-content/uploads/large_file_plugin/2020/05/1590473358_1280COVID.jpg',
        publishedAt: '2020-06-08T12:25:20Z',
        content:
          'Amid the search for a COVID-19 cure, doctors have been repurposing various drugs to give symptomatic relief to the patients. Among them is a cancer drug acalabrutinib (commercially available as Calqu… [+3684 chars]'
      },
      {
        source: {
          id: null,
          name: 'Deccan Herald'
        },
        author: 'PTI',
        title:
          'BSVL to conduct trials on severe sepsis drug in COVID-19 patients with ARDS - Deccan Herald',
        description:
          "Bharat Serums and Vaccines Ltd on Monday said it has received approval from the country's drug regulator to conduct clinical trials on existing drug ulinastatin for potential treatment of patients with COVID-19 who are suffering from acute respiratory distres…",
        url:
          'https://www.deccanherald.com/science-and-environment/bsvl-to-conduct-trials-on-severe-sepsis-drug-in-covid-19-patients-with-ards-847084.html',
        urlToImage:
          'https://www.deccanherald.com/sites/dh/files/articleimages/2020/06/08/vaccine-4946480_1920-1591611643.jpg',
        publishedAt: '2020-06-08T10:20:43Z',
        content:
          "Bharat Serums and Vaccines Ltd on Monday said it has received approval from the country's drug regulator to conduct clinical trials on existing drug ulinastatin for potential treatment of patients wi… [+1870 chars]"
      },
      {
        source: {
          id: null,
          name: 'India TV News'
        },
        author: 'PTI',
        title:
          'Novel coronavirus may spread across half of hospital surfaces in 10 hours: Study - India TV News',
        description:
          'The novel coronavirus that causes COVID-19 may spread across nearly half the surfaces of a hospital ward from a single spot in an isolated room in just 10 hours, according to a simulation study.',
        url:
          'https://www.indiatvnews.com/news/world/novel-coronavirus-may-spread-across-half-of-hospital-surfaces-in-10-hours-study-624497',
        urlToImage:
          'https://resize.indiatvnews.com/en/resize/newbucket/715_-/2020/06/coronavirus-hospital-1591609400.jpeg',
        publishedAt: '2020-06-08T10:01:50Z',
        content:
          'Image Source : APNovel coronavirus may spread across half of hospital surfaces in 10 hours: Study\r\nThe novel coronavirus that causes COVID-19 may spread across nearly half the surfaces of a hospital … [+3547 chars]'
      },
      {
        source: {
          id: null,
          name: 'Hindustan Times'
        },
        author: 'Asian News International | Posted by: Alfea Jamal',
        title:
          'Coronavirus pandemic: Covid-19 could see a declining trend by mid-September in India - Hindustan Times',
        description:
          'Covid-19 pandemic in the country could see a declining trend by mid of September this year, according to the findings of mathematical analysis by Union Health Ministry officials.',
        url:
          'https://www.hindustantimes.com/health/coronavirus-pandemic-covid-19-could-see-a-declining-trend-by-mid-september-in-india/story-fdzxzPXxIWTDoWVCDj5DhJ.html',
        urlToImage:
          'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/06/08/Pictures/spread-mumbai-the-coronavirus-disease-covid-19_e068e2e2-a965-11ea-9c49-07241376e8f9.jpg',
        publishedAt: '2020-06-08T09:11:17Z',
        content:
          'Covid-19 pandemic in the country could see a declining trend by mid of September this year, according to the findings of mathematical analysis by Union Health Ministry officials.\r\nThe study has point… [+2749 chars]'
      },
      {
        source: {
          id: null,
          name: 'The Weather Channel'
        },
        author: 'IANS',
        title:
          'COVID-19 Infection Linked to Stroke in Healthy Young People: Study - The Weather Channel',
        description:
          'Findings published in journal Neurosurgery reveal the mortality rate in COVID-19 stroke patients to be 42.8 per cent, as compared to the typical mortality from stroke, which is around 5 to 10 per cent.',
        url:
          'https://weather.com/en-IN/india/coronavirus/news/2020-06-08-covid-19-infection-stroke-healthy-young-people',
        urlToImage: 'https://s.w-x.co/in-coronavirus_17_0.jpg',
        publishedAt: '2020-06-08T07:35:53Z',
        content:
          '(IANS)\r\nResearchers have found that young and otherwise healthy patients with COVID-19 may have an increased risk of stroke even if they are not showing any symptoms of the disease.\r\nFor the findings… [+2231 chars]'
      },
      {
        source: {
          id: 'the-hindu',
          name: 'The Hindu'
        },
        author: 'R. Prasad',
        title:
          '‘Paper’ published in a predatory journal claims COVID-19 will end by mid-September - The Hindu',
        description:
          'Based on a mathematical model, it was published in the journal Epidemiology International by two scientists from the Ministry of Health',
        url:
          'https://www.thehindu.com/sci-tech/health/paper-published-in-a-predatory-journal-claims-covid-19-will-end-by-mid-september/article31776526.ece',
        urlToImage:
          'https://www.thehindu.com/sci-tech/health/rpaf1l/article31776525.ece/ALTERNATES/LANDSCAPE_615/COVIDJOURNAL',
        publishedAt: '2020-06-08T06:05:26Z',
        content:
          'A paper based on a mathematical model published in the journal Epidemiology International by two scientists from the Ministry of Health which has claimed that COVID-19 pandemic in India may come to a… [+2214 chars]'
      },
      {
        source: {
          id: null,
          name: 'Socialnewsdaily.com'
        },
        author: 'SocialNewsDaily',
        title:
          'Staying Healthy During The COVID-19 Pandemic - Social News Daily',
        description:
          'As of late May 2020, there have been more than 1.6 million cases of coronavirus in the United States, along with more than 97,000 deaths. Even as states',
        url:
          'https://socialnewsdaily.com/90191/staying-healthy-during-the-covid-19-pandemic/',
        urlToImage:
          'https://socialnewsdaily.com/wp-content/uploads/2020/06/chemistry-4932607_1280.jpg',
        publishedAt: '2020-06-08T03:17:00Z',
        content:
          'As of late May 2020, there have been more than 1.6 million cases of coronavirus in the United States, along with more than 97,000 deaths\r\n. Even as states begin to open up and we start to understand … [+5566 chars]'
      },
      {
        source: {
          id: null,
          name: 'Hindustan Times'
        },
        author: 'Anirudh Bhattacharyya | Posted by Prashasti Singh',
        title:
          'Canada’s junk food consumption, alcohol and tobacco intake rises amid Covid-19: Survey - Hindustan Times',
        description:
          'Canadians should look for a safe way to socialise and engage in physical activities, said chief public health officer Dr Theresa Tam.',
        url:
          'https://www.hindustantimes.com/world-news/canada-s-junk-food-consumption-alcohol-and-tobacco-intake-rises-amid-covid-19-survey/story-VUrWBSh4fO2LerXKLHKgXI.html',
        urlToImage:
          'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/06/08/Pictures/_13a04ef4-a928-11ea-9c49-07241376e8f9.png',
        publishedAt: '2020-06-08T02:15:00Z',
        content:
          'Canadians have taken to drinking and smoking a lot more, and eating larger amounts of junk food as a fallout of the coronavirus crisis, according to a Government survey which has alarmed health autho… [+2452 chars]'
      },
      {
        source: {
          id: null,
          name: 'Zoom'
        },
        author: 'Salome Phelamei',
        title:
          'COVID-19 vaccine development status update: Oxford’s AZD1222, Moderna’s mRNA-1273 and other top contenders - Times Now',
        description:
          'As researchers race to develop a safe and effective vaccine against COVID-19 caused by the SARS-CoV-2, here’s a quick recap of the top contenders for coronavirus vaccines.',
        url:
          'https://www.timesnownews.com/health/article/covid19-vaccines-in-clinical-trials-oxford-moderna-take-early-lead-in-race-to-develop-a-jab/602935',
        urlToImage:
          'https://imgk.timesnownews.com/story/covid-vaccine-update.gif?tr=w-560,h-292,fo-top',
        publishedAt: '2020-06-08T01:44:06Z',
        content:
          '<ul><li>The novel coronavirus has now killed at least 6,949,890 people all over the world</li></ul>\r\n<ul><li>Researchers are working tirelesly to develop a safe vaccine against the SARS-CoV-2 virus</… [+5973 chars]'
      },
      {
        source: {
          id: null,
          name: 'THE WEEK'
        },
        author: null,
        title:
          'How Artificial Intelligence-backed technology is helping in the battle against COVID-19 - THE WEEK',
        description: 'Interview, Prashant Warier, CEO and founder, Qure.ai',
        url:
          'https://www.theweek.in/news/sci-tech/2020/06/08/how-artificial-intelligence-backed-technology-is-helping-in-the-battle-against-covid-19.html',
        urlToImage:
          'https://www.theweek.in/content/dam/week/news/sci-tech//images/2020/6/8/Prashant.jpg',
        publishedAt: '2020-06-07T23:52:55Z',
        content:
          'COVID-19 has caused some irrevocable damages to the public healthcare systems in countries across the world. As scientists race against time to find the right vaccine and cure for the pandemic, techn… [+6599 chars]'
      },
      {
        source: {
          id: null,
          name: 'NDTV News'
        },
        author: null,
        title:
          'Experts Consulted, Fine-Tuning COVID-19 Plan, Says Centre Amid Criticism - NDTV',
        description:
          'Asserting that coronavirus is a "new agent" about which not everything is known, the government on Sunday defended the timing of imposition of the lockdown and rejected as "baseless" media reports expressing concerns that it did not take inputs from technical…',
        url:
          'https://www.ndtv.com/india-news/coronavirus-experts-consulted-fine-tuning-covid-19-plan-says-centre-amid-criticism-2242341',
        urlToImage:
          'https://c.ndtvimg.com/2020-06/u1vajnso_coronavirus-delhi-death-afp-_625x300_06_June_20.jpg',
        publishedAt: '2020-06-07T19:10:19Z',
        content:
          'India imposed a nationwide lockdown on March 25 to stop the spread of coronavirus.\r\nNew Delhi: Asserting that coronavirus is a "new agent" about which not everything is known, the government on Sunda… [+3871 chars]'
      },
      {
        source: {
          id: 'reuters',
          name: 'Reuters'
        },
        author: 'Reuters Editorial',
        title:
          'CDC reports 1,920,904 coronavirus cases in United States - Reuters India',
        description:
          'The U.S. Centers for Disease Control and Prevention (CDC) on Sunday reported 1,920,904 cases of new coronavirus, an increase of 29,214 cases from its previous count, and said COVID-19 deaths in the United States had risen by 709 to 109,901.',
        url:
          'https://in.reuters.com/article/health-coronavirus-usa-cdc-idINKBN23F085',
        urlToImage:
          'https://s4.reutersmedia.net/resources/r/?m=02&d=20200608&t=2&i=1521450686&w=1200&r=LYNXMPEG5704X',
        publishedAt: '2020-06-07T18:26:00Z',
        content:
          '(Reuters) - The U.S. Centers for Disease Control and Prevention (CDC) on Sunday reported 1,920,904 cases of new coronavirus, an increase of 29,214 cases from its previous count, and said COVID-19 dea… [+395 chars]'
      },
      {
        source: {
          id: null,
          name: 'All India Radio'
        },
        author: null,
        title:
          'COVID-19 recovery rate improves to 48.37 per cent; 1,19,293 people recover so far - All India Radio',
        description:
          'During the last 24 hours, a total of 5,220 COVID-19 patients have been cured in the country. So far, a total of 1,19,293 patients have been cured taking the recovery rate to 48.37 per cent.',
        url:
          'http://www.newsonair.com/News?title=COVID-19-recovery-rate-improves-to-48.37-per-cent;-1,19,293-people-recover-so-far&id=390397',
        urlToImage:
          'http://www.newsonair.com/writereaddata/News_Pictures/NAT/2020/Jun/NPIC-202067104914.jpg',
        publishedAt: '2020-06-07T16:25:24Z',
        content:
          'During the last 24 hours, a total of 5,220 COVID-19 patients have been cured in the country. So far, a total of 1,19,293 patients have been cured taking the recovery rate to 48.37 per cent.There are … [+322 chars]'
      },
      {
        source: {
          id: 'the-jerusalem-post',
          name: 'The Jerusalem Post'
        },
        author: null,
        title:
          'Israeli study points to nicotine as a potential therapeutic for COVID-19 - The Jerusalem Post',
        description:
          '"The risk of infection by COVID-19 appears to be reduced by half among current smokers," researchers have found.',
        url:
          'https://www.jpost.com/health-science/more-studies-point-to-nicotine-as-a-potential-therapeutic-for-covid-19-630576',
        urlToImage:
          'https://images.jpost.com/image/upload/f_auto,fl_lossy/t_JD_ArticleMainImageFaceDetect/458856',
        publishedAt: '2020-06-07T16:01:58Z',
        content: null
      }
    ];
    if (articles) {
      for (var i = 0; i < articles.length; i++) {
        title[i] = articles[i].title;
        url[i] = articles[i].url;
        img[i] = articles[i].urlToImage;
        this.title = title;
        this.url = url;
        this.imgUrl = img;
      }
    }
  }
  catch(err) {
    console.log(`News Api: Request not found`);
  }
}
