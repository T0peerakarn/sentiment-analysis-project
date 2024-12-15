"use client";

import Button from "@/components/button";
import { WordCloudChart } from "@/components/wordCloudChart";
import { analyse } from "@/lib/sentiment.api";
import { createFeedback, Sentiment } from "@/lib/supabase.api";
import Image from "next/image";
import { useSearchParams, redirect } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IoCaretBack } from "react-icons/io5";

interface IResult {
  sentiment: "negative" | "neutral" | "positive";
  score: number;
  attentions: { word: string; score: number }[];
}

const ResultPage = () => {
  const [result, setResult] = useState<IResult>();
  const [isVote, setIsVote] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const text = searchParams.get("text");

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "#38A617"; // green
      case "negative":
        return "#CB3333"; // red
      default:
        return "black";
    }
  };

  const voteButtons = [
    { label: "negative", styles: "bg-[#CB3333] hover:bg-[#ED5555]" },
    { label: "neutral", styles: "bg-black hover:bg-[#444444]" },
    { label: "positive", styles: "bg-[#38A617] hover:bg-[#5AC839]" },
  ];

  const voteHandler = async (vote: Sentiment) => {
    setIsVote(true);

    Swal.fire({
      title: "Success",
      text: "Your vote has been submitted.",
      icon: "success",
    });

    await createFeedback(text!, result!.sentiment as Sentiment, vote);
  };

  useEffect(() => {
    analyse(text!).then((result) => setResult(result));
  }, [text]);

  return result ? (
    <div className="w-full">
      <header className="bg-[#5E62CC] text-white p-5 w-full flex flex-row items-center">
        <IoCaretBack
          size="2em"
          onClick={() => redirect("/")}
          className="mr-auto cursor-pointer"
        />
        <h1 className="w-full text-center">NTN Sentimental Analyzer</h1>
        <IoCaretBack size="2em" className="ml-auto" color="#5E62CC" />
      </header>

      <main className="flex flex-col gap-5 py-5 px-4 tablet:px-8 laptop:px-20">
        <section className="flex flex-col gap-2">
          <h2>Inputted text: </h2>
          <div>
            <div className="border rounded-lg p-4">{text}</div>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h2>Overall sentiment: </h2>
          <div className="flex justify-center items-center border rounded-lg p-4">
            <h2
              className="text-3xl font-semibold"
              style={{ color: getSentimentColor(result.sentiment) }}
            >
              {result.sentiment} ({Math.round(result.score * 1000) / 1000})
            </h2>
          </div>
        </section>

        <WordCloudChart
          data={result.attentions.map((a) => ({
            text: a.word,
            value: Math.round(a.score * 100),
          }))}
        />

        <section className="flex flex-col gap-2">
          <h2>What do you think?</h2>
          <div className="border rounded-lg p-4 flex flex-col tablet:flex-row justify-evenly gap-y-2">
            {isVote ? (
              <p className="w-full text-center">
                Thank you for your feedback :D
              </p>
            ) : (
              voteButtons.map((item) => (
                <Button
                  key={item.label}
                  displayText={item.label}
                  onClickHandler={() => voteHandler(item.label as Sentiment)}
                  styles={item.styles}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <Image src="/loading.svg" alt="Loading" width={200} height={200} />
    </div>
  );
};

const SuspenseResultPage = () => (
  <Suspense>
    <ResultPage />
  </Suspense>
);

export default SuspenseResultPage;
