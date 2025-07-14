import React, { useState } from 'react';
import axios from 'axios';
import '../styles/form.css';

export function Form(){
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [resp, setResp] = useState<{ shortlink: string; expiry: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: any = { url };
    if (validity) body.validity = +validity;
    if (shortcode) body.shortcode = shortcode;
    try {
      const { data } = await axios.post('http://localhost:3000/shortlinks', body);
      setResp(data);
    } catch (err: any) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="form-container">
      <div className="card">
        <h1>Shorten Link</h1>
        <form onSubmit={handleSubmit}>
          <label>URL*</label>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
          />

          <label>Validity (minutes)</label>
          <input
            type="number"
            min="1"
            value={validity}
            onChange={e => setValidity(e.target.value)}
          />

          <label>Shortcode</label>
          <input
            value={shortcode}
            onChange={e => setShortcode(e.target.value)}
          />

          <button type="submit">Create</button>
        </form>

        {resp && (
          <div className="result">
            <p>
              <strong>Shortlink:</strong>{' '}
              <a href={resp.shortlink} target="_blank" rel="noreferrer">
                {resp.shortlink}
              </a>
            </p>
            <p>
              <strong>Expires at:</strong> {new Date(resp.expiry).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
