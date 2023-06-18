import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {

  function handleDelete(id) {
    fetch (`http://localhost:4000/questions/${id}`, {
      method: "DELETE"})
      .then(()=>setQuestions(()=>questions.filter(q=> q.id !== id)))
    
  }

  function handleCorrect(value, id) {
    fetch (`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        "correctIndex": value
      })
    })
    .then(r=>r.json())
    .then(data=>console.log("Correct answer set to " + data.correctIndex))
    setQuestions(questions.map(q=>{
      if (q.id === id) {
        return {...q, "correctIndex": value}
      } else {
        return q
      }
    }))
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions ? questions.map((q)=>{
          return <QuestionItem key={q.id} question={q} handleDelete={handleDelete} handleCorrect={handleCorrect} />
        })  : <li>Loading...</li>}
      </ul>
    </section>
  );
}

export default QuestionList;
