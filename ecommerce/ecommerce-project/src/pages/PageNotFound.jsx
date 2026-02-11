import { Header } from '../components/Header';
import './PageNotFound.css';

export function PageNotFound({ cart }) {
  return (
    <>
      <title>404 Not Found</title>
      <link rel="icon" href="images/not-found-favicon.jpg" />
      <Header cart={cart}/>
      <div class="not-found">
        Page not found :(
      </div>
    </>
  );
}