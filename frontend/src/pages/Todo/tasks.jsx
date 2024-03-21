import { Card } from "../../components/Card"

const Tasks = ({currentTodos, handleShow, selectedTag}) => {
  return (
    <div>
        {currentTodos.length === 0? (
            <div className="d-flex flex-column w-100 emptyDiv align-items-center justify-content-center h-100 ps-5">
                <img
                    src={emptyImg}
                    className="pt-5 emptyImg"
                    style={{ width: "30rem" }}
                    alt=""
                />
                <p className="fst-italic fw-bolder pt-5 text-primary text-center">
                    Your {selectedTag ? selectedTag : `todo`} list is
                    currently on vacation. Must be nice! Feel free to bring it
                    back to the hustle whenever you're ready.
                </p>
                <button onClick={handleShow} className="btn btn-primary mt-4">
                    Add todo
                </button>
            </div>
        ) : (
            <>{[0, 2].map(r => {
                return <div className="row pt-md-5" key={r}>
                    {[0, 1].map(c => {
                        return <div className="col-md-6 mb-md-0 mb-3" key={r+c}
                        >
                            {currentTodos[r + c] ? (
                                <Card
                                    title={currentTodos[r + c].title}
                                    desc={currentTodos[r + c].description}
                                    tag={currentTodos[r + c].tag}
                                    priority={currentTodos[r + c].priority}
                                    id={currentTodos[r + c]._id}
                                    completed={currentTodos[r + c].completed}
                                    key={currentTodos[r + c]._id}
                                    del={deleteTodosState}
                                    update={updateTodoState}
                                ></Card>
                            ) : (
                                ""
                            )}
                        </div>
                    
                    })}
                </div>
            })}</>
            
        )}
    </div>  
)
}

export default Tasks