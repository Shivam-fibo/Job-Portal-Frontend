const getSimilarityScore = async (text1, text2) => {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/textsimilarity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'iPN7XluFkkLzLbroyoNCyQ==iXAQnfNhisb8aVfz',
      },
      body: JSON.stringify({
        text_1: text1,
        text_2: text2,
      }),
    });

    const data = await response.json();
    return data.similarity;
  } catch (error) {
    console.error('Similarity API failed:', error);
    return null;
  }
};
export default getSimilarityScore