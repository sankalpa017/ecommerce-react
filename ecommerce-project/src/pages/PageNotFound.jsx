import { Header } from '../components/Header';
import './PageNotFound.css';

export function PageNotFound() {
  return (
    <>
      <title>404 Not Found</title>
      <link rel="icon" href="images/not-found-favicon.jpg" />
      <Header />
      <div class="not-found">
        Page not found :(
      </div>
    </>
  );
}