import React, { useState, useEffect } from 'react';
import { getLeads, updateLead, deleteLead } from '../store';
import { Trash2, CheckCircle, Download, Search, Phone, MessageSquare } from 'lucide-react';

const LeadsAdmin = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadLeads = () => {
    setLeads(getLeads());
    setLoading(false);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Delete this lead?')) {
      deleteLead(id);
      loadLeads();
    }
  };

  const toggleContacted = (id, currentStatus) => {
    updateLead(id, { status: currentStatus === 'contacted' ? 'new' : 'contacted' });
    loadLeads();
  };

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Gate Type', 'Material', 'Size', 'Complexity', 'Price Range', 'Date', 'Status'];
    const rows = leads.map(l => [
      l.name,
      l.phone,
      l.gateType,
      l.material,
      `${l.width}x${l.height}`,
      l.complexity,
      l.priceRange,
      l.timestamp ? new Date(l.timestamp).toLocaleDateString() : '',
      l.status
    ]);

    let csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `JDS_Leads_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(l =>
    l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phone?.includes(searchTerm)
  );

  if (loading) return <div style={{ color: '#94a3b8' }}>Loading leads...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2 style={{ color: '#fff', margin: 0 }}>Lead Management</h2>
        <button onClick={exportCSV} style={styles.exportBtn}>
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div style={styles.filterBar}>
        <div style={styles.searchBox}>
          <Search size={18} color="#475569" />
          <input 
            type="text" 
            placeholder="Search leads by name or phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div className="responsive-table-container" style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Source</th>
                <th>Message / Requirement</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
          </thead>
          <tbody>
            {filteredLeads.map(lead => (
              <tr key={lead.id} style={lead.status === 'contacted' ? styles.contactedRow : {}}>
                <td style={{ color: '#64748b', fontSize: '0.8rem' }}>
                  {lead.timestamp ? new Date(lead.timestamp).toLocaleDateString() : '—'}
                </td>
                <td>
                  <div style={{ color: '#fff', fontWeight: 600 }}>{lead.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={12} /> {lead.phone}
                  </div>
                </td>
                <td>
                  <span style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: lead.source === 'Phone Call' ? 'rgba(59,130,246,0.15)' :
                                lead.source?.includes('WhatsApp') ? 'rgba(37,211,102,0.15)' :
                                lead.source === 'Email' ? 'rgba(251,146,60,0.15)' :
                                lead.source === 'Instagram DM' ? 'rgba(232,66,144,0.15)' :
                                'rgba(0,242,255,0.1)',
                    color: lead.source === 'Phone Call' ? '#60a5fa' :
                           lead.source?.includes('WhatsApp') ? '#25d366' :
                           lead.source === 'Email' ? '#fb923c' :
                           lead.source === 'Instagram DM' ? '#e84290' :
                           'var(--accent-primary)'
                  }}>
                    {lead.source || 'Contact Form'}
                  </span>
                </td>
                <td style={{ color: '#cbd5e1', maxWidth: 220, fontSize: '0.88rem' }}>
                  {lead.message || lead.gateType || '—'}
                </td>
                <td>
                  <span style={{
                    ...styles.badge,
                    background: lead.status === 'contacted' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(0, 242, 255, 0.1)',
                    color: lead.status === 'contacted' ? '#22c55e' : 'var(--accent-primary)'
                  }}>
                    {lead.status === 'contacted' ? 'Contacted' : 'New'}
                  </span>
                </td>
                <td>
                  <div style={styles.actions}>
                    <button 
                      onClick={() => toggleContacted(lead.id, lead.status)} 
                      title={lead.status === 'contacted' ? 'Mark as New' : 'Mark as Contacted'}
                      style={{ ...styles.actionBtn, color: lead.status === 'contacted' ? '#22c55e' : '#94a3b8' }}
                    >
                      <CheckCircle size={18} />
                    </button>
                    <a href={`https://wa.me/${lead.phone}`} target="_blank" rel="noreferrer" style={{ ...styles.actionBtn, color: '#25d366' }}>
                      <MessageSquare size={18} />
                    </a>
                    <button onClick={() => handleDelete(lead.id)} style={{ ...styles.actionBtn, color: '#ef4444' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLeads.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#475569' }}>No leads found.</div>
        )}
      </div>
    </div>
  );
};

const styles = {
  exportBtn: {
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontWeight: 600
  },
  filterBar: {
    background: 'rgba(255,255,255,0.03)',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(0,0,0,0.2)',
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  searchInput: {
    background: 'none',
    border: 'none',
    color: '#fff',
    outline: 'none',
    width: '100%'
  },
  tableContainer: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.05)',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  badge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '100px',
    fontSize: '0.7rem',
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  actions: {
    display: 'flex',
    gap: '10px'
  },
  actionBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease'
  },
  contactedRow: {
    opacity: 0.6
  }
};

// Add CSS for table headers and cells
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  th {
    padding: 1.2rem 1rem;
    color: #475569;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  td {
    padding: 1.2rem 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.03);
  }
`;
document.head.appendChild(styleSheet);

export default LeadsAdmin;
