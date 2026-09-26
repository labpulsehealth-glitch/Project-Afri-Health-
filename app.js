const app = document.getElementById("app");

const demoSeed = {
  tasks: {
    t1: {
      title: "Define project workspace requirements",
      department: "Health & Research",
      owner: "Faith-Tabitha Olanipekun",
      deadline: "2026-09-29",
      description:
        "Compile the team requirements for the official Afri-Health Team Hub.",
      status: "In Progress"
    },

    t2: {
      title: "Create initial product user flow",
      department: "Product & UX",
      owner: "Netochukwu Ihuoma Chimezie",
      deadline: "2026-09-30",
      description:
        "Map how members will move through the Team Hub.",
      status: "Not Started"
    },

    t3: {
      title: "Document technical architecture",
      department: "AI & Edge Technology",
      owner: "Wisdom Ifeanyichukwu Ohagba",
      deadline: "2026-10-01",
      description:
        "Define the technical structure and future integration approach.",
      status: "Not Started"
    },

    t4: {
      title: "Draft sustainability and partnership notes",
      department: "Business, Presentation & Partnerships",
      owner: "Tadisashe Nhoro",
      deadline: "2026-10-02",
      description:
        "Document potential sustainability, partnership and presentation needs.",
      status: "Not Started"
    }
  },

  meetings: {
    m1: {
      title: "Project Afri-Health Team Meeting",
      date: "2026-09-27T20:00",
      agenda:
        "Review team structure, requirements and next deliverables.",
      preparation:
        "Each department should bring its current responsibilities and proposed deliverables."
    }
  },

  announcements: {
    a1: {
      title: "Welcome to the Team Hub",
      message:
        "This is the central workspace for Project Afri-Health. Keep final tasks, deadlines, documents and decisions here.",
      createdAt: Date.now()
    }
  },

  members: {
    p1: {
      name: "Faith-Tabitha Olanipekun",
      department: "Health & Research",
      role: "Health & Research",
      skills:
        "Health research, user research, evidence, safety and ethics"
    },

    p2: {
      name: "Tadisashe Nhoro",
      department: "Business, Presentation & Partnerships",
      role: "Business & Partnerships",
      skills:
        "Business model, partnerships, presentation and sustainability"
    },

    p3: {
      name: "Netochukwu Ihuoma Chimezie",
      department: "Product & UX",
      role: "Product & UX",
      skills:
        "Product design, user journey, wireframes and usability"
    },

    p4: {
      name: "Wisdom Ifeanyichukwu Ohagba",
      department: "AI & Edge Technology",
      role: "AI & Edge Technology",
      skills:
        "AI models, Edge AI, datasets and technical integration"
    }
  },

  activity: {
    x1: {
      text: "Project Afri-Health Team Hub initialized.",
      createdAt: Date.now()
    }
  }
};


/* =========================
   STORAGE
========================= */

function getAllData() {
  const saved = localStorage.getItem("afri_demo_data");

  if (saved) {
    return JSON.parse(saved);
  }

  localStorage.setItem(
    "afri_demo_data",
    JSON.stringify(demoSeed)
  );

  return structuredClone(demoSeed);
}

function getData(section) {
  const data = getAllData();
  return data[section] || {};
}

function saveData(section, value) {
  const data = getAllData();
  data[section] = value;

  localStorage.setItem(
    "afri_demo_data",
    JSON.stringify(data)
  );
}

function addData(section, value) {
  const data = getData(section);

  const id = "item_" + Date.now();

  data[id] = value;

  saveData(section, data);
}


/* =========================
   HELPERS
========================= */

function esc(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]
  );
}


/* =========================
   START
========================= */

function start() {

  const email =
    localStorage.getItem("afri_demo_user") ||
    "team@afri-health.local";

  renderShell(email);

  loadDashboard();
}


/* =========================
   SHELL
========================= */

function renderShell(email) {

  app.innerHTML = `

    <div class="layout">

      <aside class="sidebar" id="sidebar">

        <div class="brand">
          Project Afri-Health
          <small>Official Team Hub</small>
        </div>

        <nav class="nav">

          <a href="#dashboard">Dashboard</a>

          <a href="#tasks">
            Tasks & Deliverables
          </a>

          <a href="#meetings">
            Meetings
          </a>

          <a href="#documents">
            Documents
          </a>

          <a href="#team">
            Team
          </a>

          <a href="#departments">
            Departments
          </a>

          <a href="#announcements">
            Announcements
          </a>

          <a href="#activity">
            Activity
          </a>

        </nav>

      </aside>


      <main class="main">

        <div class="topbar">

          <div>

            <button
              class="btn secondary mobile-menu"
              id="menu"
            >
              ☰
            </button>

            <h1 id="pageTitle">
              Dashboard
            </h1>

            <div class="muted">
              Keep the team aligned, informed and moving.
            </div>

          </div>


          <div class="userbar">

            <div class="avatar">
              ${esc(email.charAt(0).toUpperCase())}
            </div>

            <span class="user-name">
              ${esc(email)}
            </span>

            <button
              class="btn danger"
              id="logout"
            >
              Logout
            </button>

          </div>

        </div>


        <div id="page"></div>

      </main>

    </div>


    <div
      class="modal"
      id="modal"
    ></div>

  `;


  document.getElementById("logout").onclick = () => {

    localStorage.removeItem("afri_demo_user");

    location.href = "login.html";

  };


  document.getElementById("menu").onclick = () => {

    document
      .getElementById("sidebar")
      .classList.toggle("open");

  };


  window.addEventListener(
    "hashchange",
    route
  );

  route();
}


/* =========================
   ROUTER
========================= */

function route() {

  const hash =
    location.hash.replace("#", "") ||
    "dashboard";


  document
    .querySelectorAll(".nav a")
    .forEach(link => {

      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + hash
      );

    });


  const titles = {

    dashboard: "Dashboard",

    tasks: "Tasks & Deliverables",

    meetings: "Meetings",

    documents: "Documents",

    team: "Team",

    departments: "Departments",

    announcements: "Announcements",

    activity: "Activity"

  };


  document.getElementById("pageTitle").textContent =
    titles[hash] || "Dashboard";


  const pages = {

    dashboard: loadDashboard,

    tasks: loadTasks,

    meetings: loadMeetings,

    documents: loadDocuments,

    team: loadTeam,

    departments: loadDepartments,

    announcements: loadAnnouncements,

    activity: loadActivity

  };


  (pages[hash] || loadDashboard)();

}


/* =========================
   DASHBOARD
========================= */

function loadDashboard() {

  const tasks =
    Object.values(getData("tasks"));

  const meetings =
    Object.values(getData("meetings"));

  const announcements =
    Object.values(getData("announcements"));


  const openTasks =
    tasks.filter(
      task => task.status !== "Completed"
    ).length;


  const completedTasks =
    tasks.filter(
      task => task.status === "Completed"
    ).length;


  document.getElementById("page").innerHTML = `

    <div class="demo-banner">
      Preview mode — your Team Hub is running locally in this browser.
    </div>


    <div class="grid">

      <div class="card stat">
        <span class="muted">
          Open tasks
        </span>

        <strong>
          ${openTasks}
        </strong>
      </div>


      <div class="card stat">
        <span class="muted">
          Completed
        </span>

        <strong>
          ${completedTasks}
        </strong>
      </div>


      <div class="card stat">
        <span class="muted">
          Meetings
        </span>

        <strong>
          ${meetings.length}
        </strong>
      </div>


      <div class="card stat">
        <span class="muted">
          Announcements
        </span>

        <strong>
          ${announcements.length}
        </strong>
      </div>

    </div>


    <div class="grid-2 section">

      <div class="card">

        <div class="section-title">

          <h2>
            Next meeting
          </h2>

          <a
            class="btn secondary"
            href="#meetings"
          >
            View all
          </a>

        </div>


        ${
          meetings.length

          ? `

            <div class="item">

              <b>
                ${esc(meetings[0].title)}
              </b>

              <p class="muted">
                ${esc(meetings[0].date || "")}
              </p>

              <p>
                ${esc(
                  meetings[0].agenda ||
                  "No agenda yet."
                )}
              </p>

            </div>

          `

          : `

            <div class="empty">
              No meetings added yet.
            </div>

          `
        }

      </div>


      <div class="card">

        <div class="section-title">

          <h2>
            Recent announcements
          </h2>

          <a
            class="btn secondary"
            href="#announcements"
          >
            View all
          </a>

        </div>


        ${
          announcements
            .slice(-3)
            .reverse()
            .map(
              announcement => `

                <div class="item">

                  <b>
                    ${esc(announcement.title)}
                  </b>

                  <p>
                    ${esc(announcement.message)}
                  </p>

                </div>

              `
            )
            .join("")

          || `

            <div class="empty">
              No announcements yet.
            </div>

          `
        }

      </div>

    </div>


    <div class="card section">

      <div class="section-title">

        <h2>
          Current team priority
        </h2>

        <span class="badge">
          Team focus
        </span>

      </div>

      <p>
        Keep final tasks, deadlines, documents and
        decisions in the Team Hub while WhatsApp or
        Teams remain available for conversation.
      </p>

    </div>

  `;
}


/* =========================
   TASKS
========================= */

function loadTasks() {

  const tasks =
    Object.entries(getData("tasks"));


  document.getElementById("page").innerHTML = `

    <div class="section-title">

      <h2>
        Team tasks
      </h2>

      <button
        class="btn primary"
        onclick="window.openTask()"
      >
        + Add task
      </button>

    </div>


    <div class="list">

      ${
        tasks.map(
          ([id, task]) => `

            <div class="item">

              <div class="item-head">

                <div>

                  <b>
                    ${esc(task.title)}
                  </b>

                  <div class="muted">
                    ${esc(task.department || "")}
                    ·
                    ${esc(task.owner || "Unassigned")}
                  </div>

                </div>


                <span class="badge">
                  ${esc(task.status || "Not Started")}
                </span>

              </div>


              <p>
                ${esc(task.description || "")}
              </p>


              <small>
                Due:
                ${esc(task.deadline || "No deadline")}
              </small>

            </div>

          `
        ).join("")

        || `

          <div class="card empty">
            No tasks yet.
          </div>

        `
      }

    </div>

  `;
}


window.openTask = function () {

  modal(`

    <h2>
      Add task
    </h2>


    <form id="taskForm">

      <label>
        Task title
        <input
          id="tTitle"
          required
        >
      </label>


      <label>
        Department

        <select id="tDept">

          <option>
            AI & Edge Technology
          </option>

          <option>
            Health & Research
          </option>

          <option>
            Product & UX
          </option>

          <option>
            Business, Presentation & Partnerships
          </option>

        </select>

      </label>


      <label>
        Owner
        <input id="tOwner">
      </label>


      <label>
        Deadline
        <input
          id="tDeadline"
          type="date"
        >
      </label>


      <label>
        Description
        <textarea id="tDesc"></textarea>
      </label>


      <button
        class="btn primary"
      >
        Save task
      </button>

    </form>

  `,

  async () => {

    addData("tasks", {

      title:
        document.getElementById("tTitle").value,

      department:
        document.getElementById("tDept").value,

      owner:
        document.getElementById("tOwner").value,

      deadline:
        document.getElementById("tDeadline").value,

      description:
        document.getElementById("tDesc").value,

      status:
        "Not Started",

      createdAt:
        Date.now()

    });


    closeModal();

    route();

  });

};


/* =========================
   MEETINGS
========================= */

function loadMeetings() {

  const meetings =
    Object.values(getData("meetings"));


  document.getElementById("page").innerHTML = `

    <div class="section-title">

      <h2>
        Meetings
      </h2>

      <button
        class="btn primary"
        onclick="window.openMeeting()"
      >
        + Add meeting
      </button>

    </div>


    <div class="list">

      ${
        meetings.map(
          meeting => `

            <div class="item">

              <div class="item-head">

                <b>
                  ${esc(meeting.title)}
                </b>

                <span class="badge">
                  ${esc(meeting.date || "")}
                </span>

              </div>


              <p>
                ${esc(meeting.agenda || "")}
              </p>


              <p class="muted">
                Preparation:
                ${esc(meeting.preparation || "")}
              </p>

            </div>

          `
        ).join("")

        || `

          <div class="card empty">
            No meetings scheduled.
          </div>

        `
      }

    </div>

  `;
}


window.openMeeting = function () {

  modal(`

    <h2>
      Add meeting
    </h2>


    <form id="meetingForm">

      <label>
        Title
        <input
          id="mTitle"
          required
        >
      </label>


      <label>
        Date & time

        <input
          id="mDate"
          type="datetime-local"
          required
        >

      </label>


      <label>
        Meeting link

        <input
          id="mLink"
          placeholder="Microsoft Teams / Google Meet / Zoom"
        >

      </label>


      <label>
        Agenda

        <textarea id="mAgenda"></textarea>

      </label>


      <label>
        Preparation required

        <textarea id="mPrep"></textarea>

      </label>


      <button class="btn primary">
        Save meeting
      </button>

    </form>

  `,

  async () => {

    addData("meetings", {

      title:
        document.getElementById("mTitle").value,

      date:
        document.getElementById("mDate").value,

      link:
        document.getElementById("mLink").value,

      agenda:
        document.getElementById("mAgenda").value,

      preparation:
        document.getElementById("mPrep").value,

      createdAt:
        Date.now()

    });


    closeModal();

    route();

  });

};


/* =========================
   TEAM
========================= */

function loadTeam() {

  const members =
    Object.values(getData("members"));


  document.getElementById("page").innerHTML = `

    <div class="section-title">

      <h2>
        Team directory
      </h2>

      <button
        class="btn primary"
        onclick="window.openMember()"
      >
        + Add member
      </button>

    </div>


    <div class="grid">

      ${
        members.map(
          member => `

            <div class="card">

              <div class="avatar">
                ${esc(
                  (member.name || "?")[0]
                )}
              </div>

              <h3>
                ${esc(member.name)}
              </h3>

              <span class="badge">
                ${esc(member.department || "")}
              </span>

              <p class="muted">
                ${esc(member.role || "")}
              </p>

              <p>
                ${esc(member.skills || "")}
              </p>

            </div>

          `
        ).join("")

        || `

          <div class="card empty">
            No team members added.
          </div>

        `
      }

    </div>

  `;
}


window.openMember = function () {

  modal(`

    <h2>
      Add member
    </h2>


    <form id="memberForm">

      <label>
        Name
        <input
          id="pName"
          required
        >
      </label>


      <label>
        Department

        <select id="pDept">

          <option>
            AI & Edge Technology
          </option>

          <option>
            Health & Research
          </option>

          <option>
            Product & UX
          </option>

          <option>
            Business, Presentation & Partnerships
          </option>

        </select>

      </label>


      <label>
        Role
        <input id="pRole">
      </label>


      <label>
        Skills
        <input id="pSkills">
      </label>


      <button class="btn primary">
        Save member
      </button>

    </form>

  `,

  async () => {

    addData("members", {

      name:
        document.getElementById("pName").value,

      department:
        document.getElementById("pDept").value,

      role:
        document.getElementById("pRole").value,

      skills:
        document.getElementById("pSkills").value

    });


    closeModal();

    route();

  });

};


/* =========================
   DEPARTMENTS
========================= */

function loadDepartments() {

  const departments = [

    [
      "AI & Edge Technology",
      "AI model, Edge AI, datasets, evaluation and technical integration."
    ],

    [
      "Health & Research",
      "Health research, evidence, users, safety and ethics."
    ],

    [
      "Product & UX",
      "Features, user journey, wireframes, usability and prototype."
    ],

    [
      "Business, Presentation & Partnerships",
      "Business model, partners, stakeholders, pitch and sustainability."
    ]

  ];


  document.getElementById("page").innerHTML = `

    <div class="grid">

      ${
        departments.map(
          department => `

            <div class="card">

              <span class="badge">
                Department
              </span>

              <h2>
                ${esc(department[0])}
              </h2>

              <p>
                ${esc(department[1])}
              </p>

            </div>

          `
        ).join("")
      }

    </div>

  `;
}


/* =========================
   ANNOUNCEMENTS
========================= */

function loadAnnouncements() {

  const announcements =
    Object.values(getData("announcements"));


  document.getElementById("page").innerHTML = `

    <div class="section-title">

      <h2>
        Announcements
      </h2>

      <button
        class="btn primary"
        onclick="window.openAnnouncement()"
      >
        + New announcement
      </button>

    </div>


    <div class="list">

      ${
        announcements
          .reverse()
          .map(
            announcement => `

              <div class="item">

                <div class="item-head">

                  <b>
                    ${esc(announcement.title)}
                  </b>

                  <small>
                    ${new Date(
                      announcement.createdAt ||
                      Date.now()
                    ).toLocaleString()}
                  </small>

                </div>

                <p>
                  ${esc(announcement.message)}
                </p>

              </div>

            `
          ).join("")

        || `

          <div class="card empty">
            No announcements.
          </div>

        `
      }

    </div>

  `;
}


window.openAnnouncement = function () {

  modal(`

    <h2>
      New announcement
    </h2>


    <form id="annForm">

      <label>
        Title
        <input
          id="aTitle"
          required
        >
      </label>


      <label>
        Message

        <textarea
          id="aMsg"
          required
        ></textarea>

      </label>


      <button class="btn primary">
        Publish
      </button>

    </form>

  `,

  async () => {

    addData("announcements", {

      title:
        document.getElementById("aTitle").value,

      message:
        document.getElementById("aMsg").value,

      createdAt:
        Date.now()

    });


    closeModal();

    route();

  });

};


/* =========================
   ACTIVITY
========================= */

function loadActivity() {

  const activity =
    Object.values(getData("activity"));


  document.getElementById("page").innerHTML = `

    <div class="card">

      <h2>
        Activity
      </h2>


      <div class="list">

        ${
          activity
            .reverse()
            .map(
              item => `

                <div class="item">

                  <b>
                    ${esc(item.text)}
                  </b>

                  <small class="muted">
                    ${new Date(
                      item.createdAt ||
                      Date.now()
                    ).toLocaleString()}
                  </small>

                </div>

              `
            ).join("")

          || `

            <div class="empty">
              No activity yet.
            </div>

          `
        }

      </div>

    </div>

  `;
}


/* =========================
   DOCUMENTS
========================= */

function loadDocuments() {

  document.getElementById("page").innerHTML = `

    <div class="card">

      <h2>
        Documents
      </h2>

      <p class="muted">
        Document uploads will be connected to
        Firebase Storage later.
      </p>


      <div class="item">

        <b>
          Recommended folders
        </b>

        <p>
          Research · AI & Edge · Product & UX ·
          Business · Meetings · Governance ·
          Presentations
        </p>

      </div>

    </div>

  `;
}


/* =========================
   MODAL
========================= */

function modal(content, onSubmit) {

  const modalElement =
    document.getElementById("modal");


  modalElement.className =
    "modal show";


  modalElement.innerHTML = `

    <div class="modal-card">

      <div class="modal-head">

        <div>
          ${content}
        </div>

        <button
          class="close"
          onclick="window.closeModal()"
        >
          ×
        </button>

      </div>

    </div>

  `;


  const form =
    modalElement.querySelector("form");


  if (form) {

    form.onsubmit = async event => {

      event.preventDefault();

      await onSubmit(event);

    };

  }

}


window.closeModal = function () {

  document.getElementById("modal").className =
    "modal";

};


/* =========================
   START APPLICATION
========================= */

start();
