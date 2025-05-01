import Home from './pages/Home'; // ← assure-toi de l'importer

<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} /> {/* ← page d'accueil */}
    <Route path="tickets" element={<TicketList />} />
    <Route path="create" element={<CreateTicket />} />
    <Route path="edit/:id" element={<EditTicket />} />
  </Route>

  {/* Routes admin */}
  ...
</Routes>
