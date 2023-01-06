import { Link } from "react-router-dom";

const NoMatchPage = () => {
    /*якщо немає відповідного шляху то викидає на цю сторінку*/
    return (
        <>
            <h1>404</h1>
            <Link to ="/">Перейти на головну сторінку</Link> {/* лінк для переходу на головну сторінку*/}
        </>
    );

};
export default NoMatchPage;