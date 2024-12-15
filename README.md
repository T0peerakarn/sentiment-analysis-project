# NTN Sentiment Analyzer

NTN Sentiment Analyzer is a web application designed to interpret the sentiment of user-provided text. The application outputs a sentiment label (positive, negative, or neutral) along with a visualization of token attention scores in the form of a word cloud. The size of each word in the word cloud corresponds to its attention score, highlighting the most significant tokens in the sentiment analysis.

## Features

- **Sentiment Analysis**: Determines whether the input text has a positive, negative, or neutral sentiment, along with the confidence score of the model.
- **Token Attention Word Cloud**: Visualizes token importance based on attention scores, with larger words indicating higher scores.

## Installation

Follow these steps to set up and run the application locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/T0peerakarn/sentiment-analysis-project.git
   cd sentiment-analysis-project
   ```

2. **Install dependencies**
   Make sure you have Node.js installed on your system. Then, install the required dependencies
   ```bash
   npm install
   ```
3. **Setup the Supabase**
   Create a supabase project, which consists of a table called `Feedback`. The table could have four columns, including:
   - `id`: a primary key of the record as `uuid` format
   - `text`: a user's input text
   - `predict`: a sentiment label predicted by the model
   - `vote`: an opinion of the user
   
   Note that the value of `predict` and `vote` must is either `positive`, `negative`, or `neutral`.

3. **Setup your sentiment API**
   
4. **Create .env file consisting SUPABASE_URL, SUPABASE_KEY, and SENTIMENT_API_URL**
   For example,
   ```bash
   SUPABASE_URL="https://example.supabase.co"
   SUPABASE_KEY="example_supabase_key"
   SENTIMENT_API_URL="example.sentiment-api.com/analyse"
   ```

6. **Run the application**
   Using
   ```bash
    
   ```
   
   And open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Technologies Used

- **Frontend**: React, TypeScript, Next.js, TailwindCSS, PostCSS
- **Backend**: FastAPI, Supabase
- **Sentiment Model**: Fine-tuned Distilbert
- **Visualization**: react-d3-cloud
