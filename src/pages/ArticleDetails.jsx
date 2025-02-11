import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { database, push, firebase, ref, onValue } from '../firebase/firebaseConfig.js';
// import Article from './pages/Article';


const ArticleDetails = () => {
  const { id } = useParams(); // الحصول على معرف المقال من URL
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const articlesRef = ref(database, 'articles');
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const articlesList = Object.values(data);
        setArticle(articlesList[id]); // تعيين المقال بناءً على المعرف
      }
    });

    // جلب التعليقات المتعلقة بالمقال الحالي
    const commentsRef = ref(database, `comments/${id}`); // استخدام المعرف كجزء من المسار
    onValue(commentsRef, (snapshot) => {
      const commentsData = snapshot.val();
      const commentsList = commentsData ? Object.values(commentsData) : [];
      setComments(commentsList);
    });
  }, [id]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const comment = event.target.comment.value;

    // حفظ التعليق في Firebase تحت معرف المقال
    push(ref(database, `comments/${id}`), {
      name,
      comment,
      date: new Date().toISOString(),
    });
    event.target.reset(); // إعادة تعيين النموذج
  };

  if (!article) return <div>Loading...</div>; // عرض رسالة تحميل إذا لم يتم العثور على المقال


  return (

    <div className="container my-5">
      {/* Hero Section */}

      <section className="container-fluid position-relative text-center text-white mb-4" style={{ minHeight: '30vh' }}>
        <img
          src="https://i.pinimg.com/736x/56/ef/94/56ef943b3f42131b44b6797143d88711.jpg"
          className="img-fluid w-100"
          alt="صورة مقالات"
          style={{ objectFit: 'cover', height: '40vh' }} // Keeps the image at 30vh
        />
        <div className="position-absolute top-50 start-50 translate-middle bg-dark bg-opacity-50 p-4 rounded">
          <h1 className="fw-bold">Welcome to the World of Articles</h1>
          <p className="lead">Enjoy reading the latest articles and exclusive content.</p>
        </div>
      </section>

      <div className="row">
        {/* الشريط الجانبي (Sidebar) */}
        <div className="col-lg-4">
          <div className="bg-white shadow-sm rounded p-4 mb-4">
            <h5 className="font-bold mb-3" style={{ color: '#9854CB' }}>Recent Post</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-3">
                <img
                  className="img-fluid"
                  src="https://i.pinimg.com/736x/ab/dd/c4/abddc4b79f0ed54ee605528cfd0e18f0.jpg"
                  alt="Recent Post"
                  style={{ width: "30%" }}
                />
                <div className="ms-3">
                  <Link to="#" style={{ color: '#9854CB' }}>
                    5 Effective Strategies for Managing Daily Tasks...
                  </Link>
                  <small className="d-block text-muted">January 12, 2023</small>
                </div>
              </li>
              <li className="d-flex align-items-center mb-3">
                <img
                  className="img-fluid"
                  src="https://i.pinimg.com/736x/a4/3c/7d/a43c7dd137390042df509efa40832a86.jpg"
                  alt="Recent Post"
                  style={{ width: "30%" }}
                />
                <div className="ms-3">
                  <Link to="#" style={{ color: '#9854CB' }}>
                    Do you think extra work will make you successful?
                  </Link>
                  <small className="d-block text-muted">03 Hours ago</small>
                </div>
              </li>
              <li className="d-flex align-items-center mb-3">
                <img
                  className="img-fluid"
                  src="https://i.pinimg.com/736x/c1/22/25/c122251436a35840803f5f9adfe51ac3.jpg"
                  alt="Recent Post"
                  style={{ width: "30%" }}
                />
                <div className="ms-3">
                  <Link to="#" style={{ color: '#9854CB' }}>
                    Is Stress physically taking over your life?
                  </Link>
                  <small className="d-block text-muted">03 Hours ago</small>
                </div>
              </li>
              <li className="d-flex align-items-center mb-3">
                <img
                  className="img-fluid"
                  src="https://i.pinimg.com/736x/d6/40/ba/d640ba4cb2f7c13addcdf066d65dcd71.jpg"
                  alt="Recent Post"
                  style={{ width: "30%" }}
                />
                <div className="ms-3">
                  <Link to="#" style={{ color: '#9854CB' }}>Office Furniture arrangement ideas</Link>
                  <small className="d-block text-muted">03 Hours ago</small>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white shadow-sm rounded p-4 mb-4">
            <h5 className="font-bold p-4 mb-4" style={{ color: '#9854CB' }}>Tag Clouds</h5>
            <div className="d-flex flex-wrap">
              <span className="badge m-2" style={{ backgroundColor: '#B7A3F7', color: '#fff' }}>#project</span>
              <span className="badge m-2" style={{ backgroundColor: '#B7A3F7', color: '#fff' }}>#technology</span>
              <span className="badge m-2" style={{ backgroundColor: '#B7A3F7', color: '#fff' }}>#travel</span>
              <span className="badge m-2" style={{ backgroundColor: '#B7A3F7', color: '#fff' }}>#restaurant</span>
              <span className="badge m-2" style={{ backgroundColor: '#B7A3F7', color: '#fff' }}>#life style</span>
              <span className="badge m-2" style={{ backgroundColor: '#B7A3F7', color: '#fff' }}>#design</span>
              <span className="badge m-2" style={{ backgroundColor: '#B7A3F7', color: '#fff' }}>#illustration</span>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-4 mb-4">
            <h5 className="font-bold mb-3" style={{ color: '#9854CB' }}>Instagram Feeds</h5>
            <div className="d-flex flex-wrap">
              <img
                className="img-fluid m-1"
                src="https://i.pinimg.com/736x/25/81/2b/25812ba4f53180e9443e76361c9bbef9.jpg"
                alt="Instagram feed"
                style={{ width: "30%" }}
              />
              <img
                className="img-fluid m-1"
                src="https://i.pinimg.com/736x/ab/ac/78/abac785eebadf5e4cd7f07c86907d97c.jpg"
                alt="Instagram feed"
                style={{ width: "30%" }}
              />
              <img
                className="img-fluid m-1"
                src="https://i.pinimg.com/736x/c6/7a/44/c67a44f9c5cd7f070cfab43648215d49.jpg"
                alt="Instagram feed"
                style={{ width: "30%" }}
              />
              <img
                className="img-fluid m-1"
                src="https://i.pinimg.com/736x/1e/77/7d/1e777d63c1a5a2d9c5f943ddb07aef92.jpg"
                alt="Instagram feed"
                style={{ width: "30%" }}
              />
              <img
                className="img-fluid m-1"
                src="https://i.pinimg.com/736x/5f/16/82/5f1682acb6c4d19dcaa142e61e49ca54.jpg"
                alt="Instagram feed"
                style={{ width: "30%" }}
              />
              <img
                className="img-fluid m-1"
                src="https://i.pinimg.com/736x/c4/7e/18/c47e18518150b4cd1b9401bf11d6ab65.jpg"
                alt="Instagram feed"
                style={{ width: "30%" }}
              />
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-4 mb-4">
            <h5 className="font-bold" style={{ color: '#9854CB' }}>Newsletter</h5>
            <form>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  required
                />
              </div>
              <button type="submit" className="btn" style={{ backgroundColor: '#B7A3F7', color: '#fff' }}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* المحتوى الرئيسي (Main Content) */}
        {/* المحتوى الرئيسي (Main Content) */}
        <div className="col-lg-7">
          {/* محتوى المدونة */}
          <div className="col-lg-12">
            <div className="single-post mb-4" key={id}>
              <div className="feature-img" style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '15px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}>
                <img
                  src={article.imageSrc}
                  alt={article.title}
                  className="img-fluid"
                  style={{
                    width: '100%',
                    height: 'auto',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div className="blog_details my-4">
                <h2 className="display-6 font-weight-bold" style={{ color: '#9854CB' }}>
                  {article.title}
                </h2>
                <ul className="list-inline blog-info-link mt-3 mb-4">
                  <li className="list-inline-item">
                    <a href="#" style={{ color: '#9854CB' }}>
                      <i className="fa fa-user"></i> {article.tags.join(', ')}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" style={{ color: '#9854CB' }}>
                      <i className="fa fa-calendar"></i> {article.date}
                    </a>
                  </li>
                </ul>
                {article.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* قسم التنقل العلوي */}
          <div className="navigation-top mt-4">
            <div className="d-sm-flex justify-content-between text-center">
              <p className="like-info">
                <span className="align-middle">
                  <i className="fa fa-heart" style={{ color: '#9854CB' }}></i>
                </span>
                Lily and 4 people like this
              </p>
              <div className="col-sm-4 text-center my-2 my-sm-0"></div>
              <ul className="social-icons list-inline">
                <li className="list-inline-item">
                  <a href="#" style={{ color: '#9854CB' }}>
                    <i className="fa fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" style={{ color: '#9854CB' }}>
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" style={{ color: '#9854CB' }}>
                    <i className="fa fa-dribbble"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" style={{ color: '#9854CB' }}>
                    <i className="fa fa-behance"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <a
                href="#src/pages/BlogPost.jsx"
                className="prev-post d-flex align-items-center text-decoration-none"
              >
                <img
                  className="img-fluid"
                  src="https://i.pinimg.com/736x/74/52/89/7452891af8e33f7026fb594dec5a2bf7.jpg"
                  alt="Recent Post"
                  style={{ width: "50px", height: "50px" }}
                />
                <div>
                  <p className="text-muted mb-1 ml-2">Previous Post</p>
                  <span
                    className="fw-bold ml-2"
                    style={{ display: 'block', textAlign: 'center', color: '#9854CB' }}
                  >
                    How to Overcome<br></br> Procrastination
                  </span>
                </div>
              </a>

              <a
                href="#"
                className="next-post d-flex align-items-center text-decoration-none text-end"
              >
                <div className="text-end me-3">
                  <p className="text-muted mb-1">Next Post</p>
                  <span className="fw-bold" style={{ display: 'block', textAlign: 'end', color: '#9854CB' }}>
                    How to Enhance Focus in a<br></br> Busy Work Environment?
                  </span>
                </div>
                <img
                  className="img-fluid"
                  src="https://i.pinimg.com/736x/47/79/f2/4779f200d02304a65221cb55d66780e9.jpg"
                  alt="Recent Post"
                  style={{ width: "50px", height: "50px" }}
                />
              </a>
            </div>
          </div>

          {/* قسم التعليقات */}
          <div className="container my-5">
            <div className="comment-list">
              <h4 className="mb-3" style={{ color: '#9854CB' }}>Comments</h4>
              {comments.map((comment, idx) => (
                <div className="single-comment justify-content-between d-flex mb-4" key={idx}>
                  <div className="user justify-content-between d-flex">
                    <div className="thumb">
                      <img
                        className="img-fluid"
                        src="https://i.pinimg.com/736x/d6/40/ba/d640ba4cb2f7c13addcdf066d65dcd71.jpg"
                        alt="Commenter"
                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                      />
                    </div>
                    <div className="desc">
                      <h5 style={{ color: "#9854CB", fontSize: "1.4rem", marginLeft: "15px", paddingRight: "10px" }}>
                        <a href="#" style={{ textDecoration: "none", color: "#9854CB" }}>{comment.name}</a>
                      </h5>
                      <p className="comment ml-4" style={{ color: "#888", fontSize: "1.1rem", marginLeft: "15px", paddingRight: "10px" }}>{comment.comment}</p>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <p className="date ml-3" style={{ color: "#888" }}>{new Date(comment.date).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="comment-form">
              <h4 className="mb-3" style={{ color: '#9854CB' }}>Leave a Reply</h4>
              <form onSubmit={handleCommentSubmit} id="commentForm" noValidate>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group mb-3">
                      <input type="text" className="form-control" name="name" placeholder="Name" required />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mb-4">
                      <textarea className="form-control w-100" name="comment" id="comment" cols="30" rows="9" placeholder="Write Comment" required></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-group text-center">
                  <button type="submit" className="btn" style={{ backgroundColor: '#B7A3F7', color: '#fff', padding: '10px 20px' }}>Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default ArticleDetails;