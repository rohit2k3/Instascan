import {View, Text, FlatList} from 'react-native';
import React, { useState } from 'react';
import NewsCard from './Components/NewsCard';
import Divider from '../../../Components/Divider';

const responseData = {
  status: 'ok',
  totalResults: 646,
  articles: [
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Jagmeet Singh',
      title:
        'Krafton acquires controlling stake in Indian gaming studio Nautilus Mobile for $14M | TechCrunch',
      description:
        'Krafton, known for its titles PUBG and BGMI, has acquired a controlling stake in 12-year-old Indian mobile gaming studio Nautilus Mobile.',
      url: 'https://techcrunch.com/2025/03/27/krafton-acquires-controlling-stake-in-indian-gaming-studio-nautilus-mobile-for-14m/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2025/03/krafton-getty.jpg?resize=1200,800',
      publishedAt: '2025-03-28T01:33:47Z',
      content:
        'Krafton, South Korea’s gaming giant known for titles including PUBG: Battlegrounds and Battlegrounds Mobile India (BGMI), has acquired a controlling stake in 12-year-old Indian gaming studio Nautilus… [+4847 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Julie Bort',
      title:
        'Open source devs are fighting AI crawlers with cleverness and vengeance | TechCrunch',
      description:
        'AI web crawling bots are the cockroaches of the internet, many developers believe. FOSS devs are fighting back in ingenuous, humorous ways.',
      url: 'https://techcrunch.com/2025/03/27/open-source-devs-are-fighting-ai-crawlers-with-cleverness-and-vengeance/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2021/07/NSussman_Techcrunch_CockroachDB-FINAL_q2-L.jpg?resize=1200,800',
      publishedAt: '2025-03-27T23:28:44Z',
      content:
        'AI web-crawling bots are the cockroaches of the internet, many software developers believe. Some devs have started fighting back in ingenuous, often humorous ways.\r\nWhile any website might be targete… [+5181 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Dominic-madori Davis',
      title:
        'Certification platform Certiverse nabs $11M series A led by Cherryrock | TechCrunch',
      description:
        'Certification platform Certiverse raised an $11 million Series A led by Cherryrock Capital, it announced this week. The company was founded by Ruben',
      url: 'https://techcrunch.com/2025/03/27/certification-platform-certiverse-nabs-11m-series-a-led-by-cherryrock/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2025/03/ruben_portrait.jpg?resize=899,1200',
      publishedAt: '2025-03-27T21:06:18Z',
      content:
        'Certification platform Certiverse raised an $11 million Series A led by Cherryrock Capital, it announced this week.\r\nThe company was founded by Ruben Garcia, Pablo Meyer, and Federico Lopez in 2023. … [+2010 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: "Sean O'kane",
      title: 'Trump’s auto tariffs are a gift to Tesla  | TechCrunch',
      description:
        'President Trump is slapping 25% tariffs on all cars imported to the United States, including from our immediate North American neighbors. He’s also placed',
      url: 'https://techcrunch.com/2025/03/27/trumps-auto-tariffs-are-a-gift-to-tesla/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2025/01/GettyImages-2183088712.jpg?resize=1200,800',
      publishedAt: '2025-03-27T18:56:21Z',
      content:
        'President Trump is slapping 25% tariffs on all cars imported to the United States, including from our immediate North American neighbors. Hes also placed a 25% tariff on certain parts used to build c… [+2723 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: "Sean O'kane",
      title: 'Trump’s auto tariffs are a gift to Tesla  | TechCrunch',
      description:
        'President Trump is slapping 25% tariffs on all cars imported to the United States, including from our immediate North American neighbors. He’s also placed',
      url: 'https://techcrunch.com/2025/03/27/trumps-auto-tariffs-are-a-gift-to-tesla/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2025/01/GettyImages-2183088712.jpg?resize=1200,800',
      publishedAt: '2025-03-27T18:56:21Z',
      content:
        'President Trump is slapping 25% tariffs on all cars imported to the United States, including from our immediate North American neighbors. Hes also placed a 25% tariff on certain parts used to build c… [+2723 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: "Sean O'kane",
      title: 'Trump’s auto tariffs are a gift to Tesla  | TechCrunch',
      description:
        'President Trump is slapping 25% tariffs on all cars imported to the United States, including from our immediate North American neighbors. He’s also placed',
      url: 'https://techcrunch.com/2025/03/27/trumps-auto-tariffs-are-a-gift-to-tesla/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2025/01/GettyImages-2183088712.jpg?resize=1200,800',
      publishedAt: '2025-03-27T18:56:21Z',
      content:
        'President Trump is slapping 25% tariffs on all cars imported to the United States, including from our immediate North American neighbors. Hes also placed a 25% tariff on certain parts used to build c… [+2723 chars]',
    },
  ],
};

const News = () => {

  const [newsRes , setNewsRes] = useState([]);
  
  
  return (
    <View>
      <Divider title={'News'} />
      <FlatList data={responseData.articles} scrollEnabled={false}
      renderItem={({item}) => <NewsCard title={item.title} imageUrl={item.urlToImage} description={item.content}/>}
      />
      {/* <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard /> */}
    </View>
  );
};

export default News;
