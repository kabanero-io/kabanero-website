# -*- encoding: utf-8 -*-
# stub: jekyll-sanity 1.2.0 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-sanity".freeze
  s.version = "1.2.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Jordon Bedwell".freeze]
  s.date = "2017-08-11"
  s.description = "Patches to make Jekyll less insane and easier".freeze
  s.email = ["jordon@envygeeks.io".freeze]
  s.homepage = "http://github.com/envygeeks/jekyll-sanity".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.1.0".freeze)
  s.rubygems_version = "3.1.2".freeze
  s.summary = "Configuration, Paths and other stuff".freeze

  s.installed_by_version = "3.1.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_development_dependency(%q<rspec>.freeze, [">= 3", "< 4"])
    s.add_development_dependency(%q<luna-rspec-formatters>.freeze, ["~> 3.7"])
    s.add_runtime_dependency(%q<jekyll>.freeze, ["~> 3.1"])
  else
    s.add_dependency(%q<rspec>.freeze, [">= 3", "< 4"])
    s.add_dependency(%q<luna-rspec-formatters>.freeze, ["~> 3.7"])
    s.add_dependency(%q<jekyll>.freeze, ["~> 3.1"])
  end
end
