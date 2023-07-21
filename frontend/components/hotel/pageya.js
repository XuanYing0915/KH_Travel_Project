import Card5 from '@/components/hotel/hotel-card2'
import { useState } from "react";
export default function App() {
    const [items, setItems] = useState([
        // "item 1",
        // "item 2",
        // "item 3",
        // "item 4",
        // "item 5",
        // "item 6",
        // "item 7",
        // "item 8",
        // "item 9",
        // "item 10"
        <Card5 />
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(3);
    const lastTodoInView = currentPage * todosPerPage;
    const firstTodoInView = lastTodoInView - todosPerPage;
    const todosForDisplay = items.slice(firstTodoInView, lastTodoInView);
    const renderItems = todosForDisplay.map((todo, index) => {
        return <li key={index}>{todo}</li>;
    });
    const pageNumbers = [];
    for (let n = 1; n <= Math.ceil(items.length / todosPerPage); n++) {
        pageNumbers.push(n);
    }
   
    const renderPageNumbers = pageNumbers.map((number, index) => {
        return <li onClick={() => setCurrentPage(number)} key={index}>
            {number}
        </li>
    });
    
    return (
        <div className="egg888">
            <div>{renderItems}</div>
            <div className="egg999">{renderPageNumbers}</div>
      </div>
    );
}
