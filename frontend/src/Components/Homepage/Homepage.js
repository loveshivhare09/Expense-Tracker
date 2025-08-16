import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Chart from "chart.js/auto";

const HomePage = () => {
  const incomeExpenseChartRef = useRef(null);
  const savingsChartRef = useRef(null);

  useEffect(() => {
    const incomeExpenseCtx = incomeExpenseChartRef.current.getContext("2d");
    const savingsCtx = savingsChartRef.current.getContext("2d");

    // Create Income vs Expense Chart
    const incomeExpenseChart = new Chart(incomeExpenseCtx, {
      type: "bar",
      data: {
        labels: ["Rent", "Food", "Utilities", "Transportation", "Entertainment"],
        datasets: [
          {
            label: "Income",
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            data: [2000, 1500, 800, 500, 700],
          },
          {
            label: "Expenses",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            data: [1800, 1200, 600, 400, 600],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          tooltip: {
            callbacks: {
              label: (tooltipItem) =>
                `${tooltipItem.dataset.label}: $${tooltipItem.raw}`,
            },
          },
        },
      },
    });

    // Create Savings Distribution Chart
    const savingsChart = new Chart(savingsCtx, {
      type: "doughnut",
      data: {
        labels: ["Savings", "Investments", "Emergency Fund"],
        datasets: [
          {
            backgroundColor: ["#36a2eb", "#ffcd56", "#ff6384"],
            data: [50, 30, 20],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: (tooltipItem) =>
                `${tooltipItem.label}: ${tooltipItem.raw}%`,
            },
          },
        },
      },
    });

    // Cleanup function to destroy charts on unmount
    return () => {
      incomeExpenseChart.destroy();
      savingsChart.destroy();
    };
  }, []);

  const styles = {
    heroSection: {
      padding: "0",
      height: "100vh", // Full screen height
      textAlign: "center",
      background: "url('images/istockphoto-1342227005-612x612.webp') no-repeat center center",
      backgroundSize: "cover",
      color: "#fff", // Light color for text visibility
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      marginTop: "59px", // to account for fixed navbar
    },
    featureCard: {
      padding: "20px",
      width: "390px",
      margin: "0 auto",
    },
    chartContainer: {
      width: "300px",
      height: "300px",
      margin: "0 auto 30px",
    },
    footer: {
      background: "#6c63ff",
      color: "#fff",
      textAlign: "center",
      padding: "20px 0",
    },
    navbar: {
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 1000,
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top" style={styles.navbar}>
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="#">
            <h3>Expenze</h3>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {["Home", "About", "Contact Us", "Help"].map((item, idx) => (
                <li className="nav-item" key={idx}>
                  <a className="nav-link" href={`#${item.toLowerCase().replace(" ", "")}`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <button className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#signInModal">
                Sign In
              </button>
              <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#signUpModal">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div>
          <h1>Welcome to Expenze</h1>
          <p>Take control of your finances with our smart budgeting tools.</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features row text-center container mt-5 mx-auto">
        {[
          { icon: "💸", title: "Track Your Expenses", desc: "Easily monitor where your money goes every day." },
          { icon: "📊", title: "Analyze Your Income", desc: "Gain insights into your income patterns and growth." },
          { icon: "🔒", title: "Secure Your Data", desc: "We prioritize your privacy with bank-level encryption." },
        ].map((feature, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card" style={styles.featureCard}>
              <div className="icon" style={{ fontSize: "50px", marginBottom: "10px" }}>
                {feature.icon}
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts container text-center mt-5">
        <div>
          <h5>Income vs Expense Chart</h5>
          <div style={styles.chartContainer}>
            <canvas ref={incomeExpenseChartRef}></canvas>
          </div>
        </div>
        <div>
          <h5>Savings Distribution</h5>
          <div style={styles.chartContainer}>
            <canvas ref={savingsChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="about text-center mt-5 p-5">
        <h1>About Us</h1>
        <h4>
          Your Money is a powerful platform designed to help individuals take control of their finances, analyze
          income, and track expenses effortlessly.
        </h4>
      </div>

      {/* Contact Section */}
      <div id="contact" className="contact text-center mt-5 p-5">
        <h1>Contact Us</h1>
        <h4>
          If you have any questions or need support, feel free to reach out to us at{" "}
          <a href="mailto:support@yourmoney.com">support@yourmoney.com</a>.
        </h4>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <h5>© Expenze</h5>
        <h6>All rights reserved.</h6>
      </footer>
    </div>
  );
};

export default HomePage;
