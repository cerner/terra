/* eslint-disable import/no-extraneous-dependencies */
import Enzyme, { mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
/* eslint-enable import/no-extraneous-dependencies */

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
