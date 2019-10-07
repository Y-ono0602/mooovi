class Product < ApplicationRecord
  has_many:reviews

  def review_average
    self.reviews.average(:rate).round  #selfは省略も可能
  end

end
