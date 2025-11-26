const STORAGE_KEY = "bookingDesignerConfig";
const SUBMISSION_KEY = "bookingSubmissions";
const USER_KEY = "bookingDesignerUser";

const WEEKDAYS = [
  { key: "seg", label: "Seg" },
  { key: "ter", label: "Ter" },
  { key: "qua", label: "Qua" },
  { key: "qui", label: "Qui" },
  { key: "sex", label: "Sex" },
  { key: "sab", label: "Sáb" },
  { key: "dom", label: "Dom" },
];

const defaultConfig = {
  title: "Mentoria Estratégica",
  description:
    "Escolha um horário e preencha os dados para que possamos preparar o melhor encontro para você.",
  accentColor: "#7f5dff",
  heroEmoji: "🎯",
  fields: [
    {
      id: "field-name",
      label: "Nome completo",
      type: "text",
      placeholder: "Ex.: Ana Costa",
      required: true,
    },
    {
      id: "field-email",
      label: "Email",
      type: "email",
      placeholder: "nome@email.com",
      required: true,
    },
    {
      id: "field-formato",
      label: "Formato do encontro",
      type: "select",
      options: ["Google Meet", "Zoom", "Presencial"],
      placeholder: "Escolha uma opção",
      required: true,
    },
    {
      id: "field-data",
      label: "Data ideal",
      type: "date",
      required: true,
    },
    {
      id: "field-hora",
      label: "Horário",
      type: "time",
      required: true,
    },
  ],
  weekdays: WEEKDAYS.map((day) => day.key),
};

const state = {
  blueprint: loadConfig(),
  submissions: loadSubmissions(),
  user: loadUser(),
  currentView: null,
};

const els = {
  titleInput: document.getElementById("formTitle"),
  descriptionInput: document.getElementById("formDescription"),
  accentInput: document.getElementById("accentColor"),
  heroEmojiInput: document.getElementById("heroEmoji"),
  heroEmojiPreview: document.getElementById("heroEmojiPreview"),
  previewTitle: document.getElementById("previewTitle"),
  previewDescription: document.getElementById("previewDescription"),
  publicHeroEmoji: document.getElementById("publicHeroEmoji"),
  publicTitle: document.getElementById("publicTitle"),
  publicDescription: document.getElementById("publicDescription"),
  publicBookingForm: document.getElementById("publicBookingForm"),
  fieldsContainer: document.getElementById("fieldsContainer"),
  newFieldForm: document.getElementById("newFieldForm"),
  bookingForm: document.getElementById("bookingForm"),
  submissionsLog: document.getElementById("submissionsLog"),
  clearSubmissions: document.getElementById("clearSubmissions"),
  resetConfig: document.getElementById("resetConfig"),
  weekdayPicker: document.getElementById("weekdayPicker"),
  previewWeekdays: document.getElementById("previewWeekdays"),
  publicWeekdays: document.getElementById("publicWeekdays"),
  loginForm: document.getElementById("loginForm"),
  loginEmail: document.getElementById("loginEmail"),
  loginPassword: document.getElementById("loginPassword"),
  rememberMe: document.getElementById("rememberMe"),
  loginStatus: document.getElementById("loginStatus"),
  sessionChip: document.getElementById("sessionChip"),
  navButtons: document.querySelectorAll("[data-view-target]"),
  viewSections: document.querySelectorAll("[data-view]"),
  selectTemplate: document.getElementById("selectTemplate"),
  inputTemplate: document.getElementById("inputTemplate"),
  textareaTemplate: document.getElementById("textareaTemplate"),
  fieldRowTemplate: document.getElementById("fieldRowTemplate"),
};

hydrateInitialState();
renderFieldList();
renderForms();
renderSubmissions();
bindEvents();
initializeView();

function hydrateInitialState() {
  els.titleInput.value = state.blueprint.title;
  els.descriptionInput.value = state.blueprint.description ?? "";
  els.accentInput.value = state.blueprint.accentColor ?? "#7f5dff";
  els.heroEmojiInput.value = state.blueprint.heroEmoji ?? "✨";

  if (state.user?.email) {
    els.loginEmail.value = state.user.email;
  }
  updateSessionChip();
  syncAccentColors(state.blueprint.accentColor);
  renderWeekdayPicker();
}

function bindEvents() {
  els.titleInput.addEventListener("input", (event) => {
    state.blueprint.title = event.target.value;
    persistConfig();
    renderForms();
  });

  els.descriptionInput.addEventListener("input", (event) => {
    state.blueprint.description = event.target.value;
    persistConfig();
    renderForms();
  });

  els.accentInput.addEventListener("input", (event) => {
    state.blueprint.accentColor = event.target.value;
    syncAccentColors(event.target.value);
    persistConfig();
    renderForms();
  });

  els.heroEmojiInput.addEventListener("input", (event) => {
    const value = (event.target.value || "✨").trim();
    state.blueprint.heroEmoji = value || "✨";
    persistConfig();
    renderForms();
  });

  els.newFieldForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newField = buildFieldFromForm(formData);
    state.blueprint.fields.push(newField);
    persistConfig();
    event.currentTarget.reset();
    renderFieldList();
    renderForms();
  });

  els.bookingForm.addEventListener("submit", handleBookingSubmit);
  els.publicBookingForm.addEventListener("submit", handlePublicBookingSubmit);

  els.clearSubmissions.addEventListener("click", () => {
    state.submissions = [];
    persistSubmissions();
    renderSubmissions();
  });

  els.resetConfig.addEventListener("click", () => {
    state.blueprint = clone(defaultConfig);
    persistConfig();
    hydrateInitialState();
    renderFieldList();
    renderForms();
  });

  els.weekdayPicker.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-day]");
    if (!button) return;
    toggleWeekday(button.dataset.day);
  });

  els.loginForm.addEventListener("submit", handleLoginSubmit);

  els.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.viewTarget;
      switchView(target);
    });
  });
}

function initializeView() {
  const initialView = state.user ? "admin" : "login";
  switchView(initialView);
}

function switchView(target) {
  const viewName = target || "login";
  state.currentView = viewName;
  els.viewSections.forEach((section) => {
    section.classList.toggle("active", section.dataset.view === viewName);
  });
  els.navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.viewTarget === viewName);
  });
}

function updateSessionChip() {
  els.sessionChip.textContent = state.user?.email || "Visitante";
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const email = els.loginEmail.value.trim();
  const password = els.loginPassword.value.trim();
  if (!email || password.length < 4) {
    els.loginStatus.textContent = "Informe email e uma senha com ao menos 4 caracteres.";
    return;
  }

  const user = {
    email,
    name: email.split("@")[0],
  };
  state.user = user;

  if (els.rememberMe.checked) {
    persistUser(user);
  } else {
    removeUser();
  }

  updateSessionChip();
  els.loginStatus.textContent = `Bem-vindo, ${user.name}!`;
  els.loginPassword.value = "";
  switchView("admin");
  flashMessage("Login efetuado. Personalize seu fluxo!");
}

function renderForms() {
  renderPreview();
  renderPublicView();
  renderWeekdayBadges();
}

function renderPreview() {
  els.previewTitle.textContent = state.blueprint.title || "Título do agendamento";
  els.previewDescription.textContent =
    state.blueprint.description || "Descreva seu fluxo para o convidado.";
  els.heroEmojiPreview.textContent = (state.blueprint.heroEmoji || "✨").slice(0, 2);
  populateBookingForm(els.bookingForm, "Simular agendamento");
}

function renderPublicView() {
  els.publicTitle.textContent = state.blueprint.title || "Título do agendamento";
  els.publicDescription.textContent =
    state.blueprint.description || "Adicione detalhes para orientar o convidado.";
  els.publicHeroEmoji.textContent = (state.blueprint.heroEmoji || "✨").slice(0, 2);
  populateBookingForm(els.publicBookingForm, "Confirmar agendamento");
}

function renderWeekdayPicker() {
  if (!els.weekdayPicker) return;
  const selected = new Set(normalizeWeekdays(state.blueprint.weekdays));
  els.weekdayPicker.innerHTML = "";
  WEEKDAYS.forEach(({ key, label }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.day = key;
    button.textContent = label;
    if (selected.has(key)) button.classList.add("active");
    els.weekdayPicker.appendChild(button);
  });
}

function toggleWeekday(dayKey) {
  if (!dayKey) return;
  const current = new Set(normalizeWeekdays(state.blueprint.weekdays));
  if (current.has(dayKey)) {
    current.delete(dayKey);
  } else {
    current.add(dayKey);
  }
  state.blueprint.weekdays = WEEKDAYS.map(({ key }) => key).filter((key) => current.has(key));
  persistConfig();
  renderWeekdayPicker();
  renderWeekdayBadges();
}

function renderWeekdayBadges() {
  const selectedKeys = normalizeWeekdays(state.blueprint.weekdays);
  const selectedSet = new Set(selectedKeys);
  const ordered = WEEKDAYS.filter(({ key }) => selectedSet.has(key));
  const renderInto = (container) => {
    if (!container) return;
    container.innerHTML = "";
    if (!ordered.length) {
      const empty = document.createElement("p");
      empty.className = "muted micro";
      empty.textContent = "Nenhum dia selecionado";
      container.appendChild(empty);
      return;
    }
    ordered.forEach(({ label }) => {
      const chip = document.createElement("span");
      chip.textContent = label;
      container.appendChild(chip);
    });
  };
  renderInto(els.previewWeekdays);
  renderInto(els.publicWeekdays);
}

function populateBookingForm(formElement, submitLabel) {
  formElement.innerHTML = "";
  if (!state.blueprint.fields.length) {
    formElement.innerHTML = '<p class="muted">Adicione campos no painel para visualizar aqui.</p>';
    return;
  }

  state.blueprint.fields.forEach((field) => {
    const fieldNode = buildPreviewField(field);
    formElement.appendChild(fieldNode);
  });

  const button = document.createElement("button");
  button.type = "submit";
  button.className = "primary";
  button.textContent = submitLabel;
  formElement.appendChild(button);
}

function renderFieldList() {
  const container = els.fieldsContainer;
  container.innerHTML = "";
  if (!state.blueprint.fields.length) {
    container.classList.add("empty");
    container.innerHTML = '<p class="muted">Nenhum campo configurado ainda.</p>';
    return;
  }
  container.classList.remove("empty");
  state.blueprint.fields.forEach((field, index) => {
    const node = els.fieldRowTemplate.content.firstElementChild.cloneNode(true);
    node.dataset.id = field.id;
    node.querySelector(".label").textContent = field.label;
    node.querySelector(".type").textContent = field.type;
    const up = node.querySelector(".move-up");
    const down = node.querySelector(".move-down");
    const del = node.querySelector(".delete");
    if (index === 0) up.disabled = true;
    if (index === state.blueprint.fields.length - 1) down.disabled = true;
    up.addEventListener("click", () => moveField(index, index - 1));
    down.addEventListener("click", () => moveField(index, index + 1));
    del.addEventListener("click", () => deleteField(index));
    container.appendChild(node);
  });
}

function renderSubmissions() {
  const log = els.submissionsLog;
  log.innerHTML = "";
  if (!state.submissions.length) {
    log.innerHTML = '<p class="muted">Sem simulações ainda.</p>';
    return;
  }
  [...state.submissions]
    .slice(-5)
    .reverse()
    .forEach((entry) => {
      const wrapper = document.createElement("div");
      wrapper.className = "log-entry";
      const mainField = entry.summary || entry.values?.[0] || "Nova simulação";
      const timestamp = new Date(entry.at).toLocaleString("pt-BR", {
        dateStyle: "medium",
        timeStyle: "short",
      });
      wrapper.innerHTML = `<strong>${mainField}</strong><span>${timestamp}</span>`;
      log.appendChild(wrapper);
    });
}

function handleBookingSubmit(event) {
  event.preventDefault();
  const values = collectFormValues(event.currentTarget);
  const summary = values.find((value) => value && value.trim()) || "Simulação";
  recordSubmission(values, summary);
  event.currentTarget.reset();
  flashMessage("Simulação armazenada com sucesso!");
}

function handlePublicBookingSubmit(event) {
  event.preventDefault();
  const values = collectFormValues(event.currentTarget);
  const summary = values.find((value) => value && value.trim()) || "Novo agendamento";
  recordSubmission(values, summary);
  event.currentTarget.reset();
  flashMessage("Agendamento enviado! Você receberá uma confirmação.");
}

function collectFormValues(formElement) {
  const formData = new FormData(formElement);
  return state.blueprint.fields.map((field) => formData.get(field.id) || "");
}

function recordSubmission(values, summary) {
  const entry = {
    id: cryptoRandom(),
    at: new Date().toISOString(),
    values,
    summary,
  };
  state.submissions.push(entry);
  persistSubmissions();
  renderSubmissions();
}

function buildFieldFromForm(formData) {
  const type = formData.get("fieldType") || "text";
  const options = (formData.get("fieldOptions") || "")
    .split(",")
    .map((opt) => opt.trim())
    .filter(Boolean);
  return {
    id: `field-${cryptoRandom()}`,
    label: formData.get("fieldLabel") || "Novo campo",
    type,
    placeholder: formData.get("fieldPlaceholder") || "",
    required: formData.get("fieldRequired") === "on",
    options,
  };
}

function moveField(from, to) {
  if (to < 0 || to >= state.blueprint.fields.length) return;
  const [item] = state.blueprint.fields.splice(from, 1);
  state.blueprint.fields.splice(to, 0, item);
  persistConfig();
  renderFieldList();
  renderForms();
}

function deleteField(index) {
  state.blueprint.fields.splice(index, 1);
  persistConfig();
  renderFieldList();
  renderForms();
}

function buildPreviewField(field) {
  if (field.type === "textarea") {
    const node = els.textareaTemplate.content.firstElementChild.cloneNode(true);
    populateFieldNode(node, field);
    node.querySelector("textarea").name = field.id;
    return node;
  }

  if (field.type === "select") {
    const node = els.selectTemplate.content.firstElementChild.cloneNode(true);
    populateFieldNode(node, field);
    const select = node.querySelector("select");
    select.name = field.id;
    if (field.placeholder) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = field.placeholder;
      option.disabled = true;
      option.selected = true;
      select.appendChild(option);
    }
    (field.options || []).forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });
    return node;
  }

  const node = els.inputTemplate.content.firstElementChild.cloneNode(true);
  populateFieldNode(node, field);
  const input = node.querySelector("input");
  input.type = mapInputType(field.type);
  input.name = field.id;
  return node;
}

function populateFieldNode(node, field) {
  const label = node.querySelector("span");
  label.textContent = field.required ? `${field.label} *` : field.label;
  const control = node.querySelector("input, textarea, select");
  if (control.tagName !== "SELECT") {
    control.placeholder = field.placeholder || "";
  }
  control.required = Boolean(field.required);
}

function mapInputType(type) {
  const supported = ["text", "email", "tel", "number", "date", "time"];
  return supported.includes(type) ? type : "text";
}

function flashMessage(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

function syncAccentColors(color) {
  const accent = sanitizeHex(color) || defaultConfig.accentColor;
  const lighter = lightenColor(accent, 0.4);
  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--accent-soft", lighter);
}

function lightenColor(hex, ratio = 0.3) {
  const { r, g, b } = hexToRgb(hex);
  const mix = (channel) => Math.round(channel + (255 - channel) * ratio);
  return rgbToHex(mix(r), mix(g), mix(b));
}

function sanitizeHex(value) {
  if (typeof value !== "string") return null;
  const hex = value.trim();
  const valid = /^#?[0-9a-fA-F]{6}$/;
  if (!valid.test(hex)) return null;
  return hex.startsWith("#") ? hex : `#${hex}`;
}

function hexToRgb(hex) {
  const value = sanitizeHex(hex) ?? "#000000";
  const stripped = value.replace("#", "");
  const bigint = parseInt(stripped, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

function cryptoRandom() {
  return Math.random().toString(36).slice(2, 8);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeWeekdays(list) {
  if (!Array.isArray(list)) return [];
  const valid = new Set(WEEKDAYS.map(({ key }) => key));
  return list.filter((day) => valid.has(day));
}

function loadConfig() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return clone(defaultConfig);
  try {
    const data = JSON.parse(raw);
    const fields = Array.isArray(data.fields) ? data.fields : defaultConfig.fields;
    const weekdays = normalizeWeekdays(data.weekdays ?? defaultConfig.weekdays);
    return {
      title: data.title ?? defaultConfig.title,
      description: data.description ?? defaultConfig.description,
      accentColor: data.accentColor ?? defaultConfig.accentColor,
      heroEmoji: data.heroEmoji ?? defaultConfig.heroEmoji,
      fields: fields.map((field, index) => ({
        id: field.id ?? `field-${index}-${cryptoRandom()}`,
        label: field.label ?? `Campo ${index + 1}`,
        type: field.type ?? "text",
        placeholder: field.placeholder ?? "",
        options: field.options ?? [],
        required: Boolean(field.required),
      })),
      weekdays,
    };
  } catch (error) {
    console.warn("Erro ao ler configuração, usando padrão.", error);
    return clone(defaultConfig);
  }
}

function persistConfig() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.blueprint));
}

function loadSubmissions() {
  const raw = localStorage.getItem(SUBMISSION_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("Falha ao ler histórico de simulações.", error);
    return [];
  }
}

function persistSubmissions() {
  localStorage.setItem(SUBMISSION_KEY, JSON.stringify(state.submissions));
}

function loadUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function persistUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}
