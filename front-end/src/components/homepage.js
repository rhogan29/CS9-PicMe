import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './loginform'
import RegistrationForm from './registrationform'

import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

const HomepageHeading = ({ mobile }) => (
  <Container style={{marginBottom: "20px"}} text>
    <Header
      as='h1'
      content='PicMe'
      inverted
      style={{
        fontSize: mobile ? '6em' : '8em',
        fontWeight: 'normal',
        marginBottom: 0,
      }}
    />
    <Header
      as='h2'
      content='Share photos around the world!'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
        marginBottom: '1.5em',
      }}
    />
    <Link to="/register"><Button primary size='huge' style={{marginBottom: '20px'}}>
      Get Started
      <Icon name='right arrow' />
    </Button></Link>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = { openLogin: false }

  showLogin = () => this.setState({ openLogin: true })
  closeLogin = () => this.setState({ openLogin: false })

  showRegistration = () => this.setState({ openRegistration: true })
  closeRegistration = () => this.setState({ openRegistration: false })

  closeLoginOpenReg = () => {
    this.closeLogin();
    this.showRegistration();
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <LoginForm openLogin={this.state.openLogin} closeLogin={this.closeLogin} closeLoginOpenReg={this.closeLoginOpenReg} />
        <RegistrationForm openLogin={this.state.openRegistration} closeLogin={this.closeRegistration} />
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em', backgroundImage: 'url(https://res.cloudinary.com/picme/image/upload/v1534982576/Site-layout-images/aperture-black-blur-274973.jpg)', backgroundSize: 'cover' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item position='right'>
                  <Button onClick={this.showLogin} inverted={!fixed}>
                    Log in
                  </Button>
                  <Button onClick={this.showRegistration} inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <Menu.Item active>
              Home
            </Menu.Item>
            <Link to="/login"><Menu.Item>Log in</Menu.Item></Link>
            <Link to="register"><Menu.Item>Sign Up</Menu.Item></Link>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Link to="/login"><Button inverted>
                      Log in
                    </Button></Link>
                    <Link to="/register"><Button inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button></Link>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em', textAlign: 'center'}} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8} style={{ marginLeft: '280px'}}>
            <Header as='h3' style={{ fontSize: '2em'}}>
            Share photos with your friends all over the world!
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              PicMe is a social media, image-sharing platform. 
              Upload your images, tag your friends, add photos 
              to your collection, and share your experiences with the world!
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
            Want to learn more about what we do?
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            Hit the button below to get some more info, and to get started sharing your photos with the world!
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='left' style={{ marginLeft: "460px" }}>
            <Link to="/aboutUs"><Button size='huge'>Check out more</Button></Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
            “The camera is an instrument that teaches people how to see without a camera.”
            </Header>
            <p style={{ fontSize: '1.33em' }}>— Dorothea Lange</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
            “If you see something that moves you, and then snap it, you keep a moment.”
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              — Linda McCartney
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Thanks for checking out PicMe!
              </Header>
              <p>
                Made With Passion By Lambda School Engineers
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout
