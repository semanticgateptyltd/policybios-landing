import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';

const htmlPath = path.resolve(process.cwd(), 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

let dom;
let document;

beforeEach(() => {
  dom = new JSDOM(html, { url: 'https://example.com' });
  document = dom.window.document;
});

describe('Landing page structure', () => {
  it('has correct title', () => {
    expect(document.title).toBe('PolicyBIOS - Automate CPS 230 Compliance | Q1 2026 Pilot Program');
  });

  it('renders header with logo and company name', () => {
    const header = document.querySelector('header');
    expect(header).toBeTruthy();
    expect(header.querySelector('img[alt="PolicyBIOS Logo"]')).toBeTruthy();
    expect(header.querySelector('h1')?.textContent).toContain('PolicyBIOS');
  });

  it('has hero section with primary CTA', () => {
    const hero = document.querySelector('section');
    expect(hero).toBeTruthy();
    const cta = hero.querySelector('a[href="#pilot"]');
    expect(cta).toBeTruthy();
    expect(cta.textContent).toMatch(/Apply for Q1 2026 Pilot/i);
  });
});

describe('Pilot application form', () => {
  it('has form with required fields and submission target', () => {
    const form = document.querySelector('#pilot-form');
    expect(form).toBeTruthy();
    expect(form.getAttribute('action')).toBe('https://api.web3forms.com/submit');

    const requiredIds = ['organization', 'entity-type', 'name', 'role', 'email', 'compliance-hours'];
    for (const id of requiredIds) {
      const el = document.getElementById(id);
      expect(el).toBeTruthy();
      expect(el.hasAttribute('required')).toBe(true);
    }
  });
});
