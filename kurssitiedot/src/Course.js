const Header = (props) =>{
    return ( 
    <>
     <h1>
       {props.course}
     </h1>
   </>
   )
   }
   
   const Part = (props) =>{
     return(
       <>
       <p>
         {props.part} {props.exercise}
       </p>
       </>
     )
   }
   const Content = (props) =>{
     const { parts } = props
     return(
       <>
       {parts.map(part => <Part key = {part.id} part = {part.name} exercise = {part.exercises}/>)}
       </>
     )
   }
   
   const Total = (props) => {
     const exercises = props.parts.map(ex => ex.exercises)
     const sum = exercises.reduce((accumulator, value) =>{
       return accumulator + value
     })
     return(
     <>
     <p>
       <strong>total of {sum} exercises</strong>
     </p>
     </>
     )
   }
   
  export const Course = (props) => {
    
     return (
       <div>
         <Header course={props.course.name} />
         <Content parts = {props.course.parts}/>
         <Total parts = {props.course.parts}/>
       </div>
     )
   }
   