import { Helmet } from 'react-helmet-async';
import Card from '../card/Card';
import './Work.css';

export default function Work() {
  return (
    <div className='page'>
      <Helmet>
        <title>Ossama Edbali | Work</title>
      </Helmet>

      <header className='page-header'>
        <h1>Work</h1>
      </header>

      <div className='content'>
        <p>
          I currently work at <a href='https://www.birmingham.ac.uk/'>The University of Birmingham</a> as a
          research fellow in computational metabolomics at the <a href='https://www.birmingham.ac.uk/research/activity/phenome-centre'>Phenome Centre Birmingham (PCB)</a>.
        </p>
        <p>
          Throughout the years I worked in several fields ranging from education to web agencies, acquiring experience in both backend and frontend web development.
        </p>
        <p>
          I also work as a part-time freelancer specialising in websites, web app development, and website/web app performance.
        </p>
        <p>
          Following are some of the projects I worked/am working on:
        </p>

        <div className='cards' style={{ paddingTop: '2rem' }}>
          <Card
            header={<h2 className='work-item__title'>COVID-19 Data Portal</h2>}
            content={<p className='work-item__description'>The COVID-19 Data Portal (<a href='https://www.covid19dataportal.org'>https://www.covid19dataportal.org</a>) was first released as part of the European COVID-19 Data Platform, on April 20th 2020 to facilitate rapid and open data sharing and analysis, to accelerate global SARS-CoV-2 and COVID-19 research.</p>}
            footer={<a href='https://academic.oup.com/nar/advance-article/doi/10.1093/nar/gkab417/6287847' className='work-item__more-info'>More info</a>}
          />

          <Card
            header={<h2 className='work-item__title'>EBI Search</h2>}
            content={<p className='work-item__description'>EBI Search is a scalable text search engine that provides easy and uniform access to the biological data resources hosted at the European Bioinformatics Institute (EMBL-EBI).</p>}
            footer={<a href='https://www.ebi.ac.uk/ebisearch/overview.ebi/about' className='work-item__more-info'>More info</a>}
          />

          <Card
            header={<h2 className='work-item__title'>eslint-plugin-ng-extra</h2>}
            content={<p className='work-item__description'>ESLint plugin for Angular. This plugin contains checks that are not present in <a href='https://github.com/angular-eslint/angular-eslint'>angular-eslint</a>.</p>}
            footer={<a href='https://github.com/oss6/eslint-plugin-ng-extra' className='work-item__more-info'>More info</a>}
          />

          <Card
            header={<h2 className='work-item__title'>vf-core-service-discovery</h2>}
            content={
              <p className='work-item__description'>
                Service discovery tool for the <a href='https://github.com/visual-framework/vf-core'>vf-core</a>, which is a (primarily CSS) framework that targets
                needs of life science websites and services (e.g. <a href='https://www.embl.org/'>European Molecular Biology Laboratory</a>).
              </p>}
            footer={<a href='https://github.com/oss6/vf-core-service-discovery' className='work-item__more-info'>More info</a>}
          />

          <Card
            header={<h2 className='work-item__title'>House of Thobes</h2>}
            content={
              <p className='work-item__description'>
                A website for an online clothing shop using a frontend-only approach with AWS serverless architecture for processing orders.
              </p>}
            footer={<a href='https://houseofthobes.co.uk/' className='work-item__more-info'>More info</a>}
          />

          <Card
            header={<h2 className='work-item__title'>CC Tutor</h2>}
            content={
              <p className='work-item__description'>
                A compilation process visualisation platform providing students with the necessary tools to inspect
                the processes underlying a compiler frontend.
                The API has been developed in Laravel PHP and the UI in React JS.
              </p>}
            footer={<a href='https://cc-tutor.herokuapp.com/' className='work-item__more-info'>More info</a>}
          />

          <Card
            header={<h2 className='work-item__title'>Code First: Girls</h2>}
            content={
              <p className='work-item__description'>
                As part of the "Code First: Girls" courses I volunteered to be an instructor.
                The course covered the basics of HTML, CSS, JavaScript, and version control systems.
              </p>}
            footer={<a href='https://www.codefirstgirls.org.uk/' className='work-item__more-info'>More info</a>}
          />

          <Card
            header={<h2 className='work-item__title'>Kamil</h2>}
            content={
              <p className='work-item__description'>
                A dependency-free JavaScript autocomplete library.
                The library was inspired by the jQuery autocomplete library and the lack of
                (at the time) highly customisable dependency-free autocomplete libraries.
              </p>}
            footer={<a href='https://oss6.github.io/kamil/' className='work-item__more-info'>More info</a>}
          />
        </div>
      </div>
    </div>
  )
}
