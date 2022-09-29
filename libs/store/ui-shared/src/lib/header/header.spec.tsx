import React from 'react';
import { render } from '@testing-library/react';

import Header from './header';

describe('Header', () => {
  it('should render successfully', () => {
    // @ts-ignore
    const { baseElement } = render(<Header />);
    expect(baseElement).toBeTruthy();
  });
});
