import { Injector } from '@angular/core';
import { MagicService } from './magic.service';
import { getTestBed, TestBed } from '@angular/core/testing';

describe('SampleService', () => {
  beforeEach(() => {
    spyOn(console, 'error');
  });

  it('should provide resilient magic', () => {
    expect(MagicService.IS_NATIVESCRIPT()).toBe(true);
    expect(MagicService.IS_IOS()).toBe(true);
    expect(MagicService.IS_ANDROID()).toBe(false);
    expect(MagicService.TEMPLATE_URL('./components/test.html')).toBe('./components/test.html');
    expect(MagicService.STYLE_URLS(['./components/test.css'])).toBe('./components/test.css');
  });

  it('should provide platform specific magic', () => {
    expect(MagicService.TEMPLATE_URL('./components/test.html', true)).toBe('./components/test.html');
    expect(MagicService.STYLE_URLS(['./components/test.css'], true)).toBe('./components/test.css');
  });
});
